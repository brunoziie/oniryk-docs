import { compare } from '@app:helpers/bcrypt';
import { AppError } from '@app:helpers/error';
import ResetPasswordEmail, {
  ResetPasswordEmailProps,
} from '@app:resources/emails/reset-password';
import { MailerService } from '@app:services/core/mailer';
import { db } from '@db:client';
import { PasswordRecoveryRepository } from '@db:repositories/password-recovery';
import { UserRepository } from '@db:repositories/user';

export class PasswordService {
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw AppError('auth', 'invalid credentials', 400);
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw AppError('auth', 'invalid credentials', 400);
    }

    return user.id as string;
  }

  static async forgot(email: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw AppError('auth', 'invalid email', 400);
    }

    const code = await PasswordRecoveryRepository.create(user);

    MailerService.sendLater<typeof ResetPasswordEmail, ResetPasswordEmailProps>(
      {
        to: user.email,
        subject: 'Password recovery',
      },
      ResetPasswordEmail,
      { code, name: user.displayName.split(' ')[0] }
    );
  }

  static async reset(code: string, password: string) {
    await db.transaction(async (tx) => {
      const recovery = await PasswordRecoveryRepository.findByCode(code, tx);

      if (!recovery) {
        throw AppError('auth', 'invalid recovery code', 400);
      }

      const { id, userId } = recovery;
      await UserRepository.changePassword(userId, password, tx);
      await PasswordRecoveryRepository.delete(id, tx);
    });
  }
}

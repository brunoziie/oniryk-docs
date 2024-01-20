import { encrypt, compare } from '@app/helpers/bcrypt';
import { nanoid } from 'nanoid';
import ms from 'ms';
import { MailerService } from '../core/mailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import ResetPasswordEmail, {
  ResetPasswordEmailProps,
} from '@/src/resources/emails/reset-password';

export class PasswordService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error('Auth: Invalid credentials');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Auth: Invalid credentials');
    }

    return user.id as string;
  }

  static async forgot(email: string) {
    const user = await prisma.user.findFirst({ where: { email, deletedAt: null } });

    if (!user) {
      throw new Error('Auth: Invalid user email');
    }

    const code = nanoid(64);

    await prisma.passwordRecovery.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + ms('10 minutes')),
      },
    });

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
    const recovery = await prisma.passwordRecovery.findFirst({
      where: { code, expiresAt: { gt: new Date() } },
    });

    if (!recovery) {
      throw new Error('Auth: Invalid and/or expired recovery code');
    }

    const { id, userId } = recovery;

    await prisma.passwordRecovery.delete({ where: { id } });
    await prisma.user.update({
      where: { id: userId },
      data: { password: await encrypt(password) },
    });
  }
}

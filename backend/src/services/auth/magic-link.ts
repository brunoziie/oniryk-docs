import { AppError } from '@app:helpers/error';
import { LongId } from '@app:helpers/id';
import MagicLinkMail, { MagicLinkEmailProps } from '@app:resources/emails/magic-link';
import { MagicLinkRepository } from '@db:repositories/magic-link';
import { UserRepository } from '@db:repositories/user';
import { MailerService } from '../core/mailer';

export type UserId = string;

export default class MagicLinkService {
  static async sendMagicLink(email: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw AppError('auth', 'invalid email', 400);
    }

    const code = await MagicLinkRepository.create(user);

    await MailerService.sendLater<typeof MagicLinkMail, MagicLinkEmailProps>(
      {
        to: user.email,
        subject: 'Magic Link',
      },
      MagicLinkMail,
      {
        name: user.displayName.split(' ')[0],
        code: code,
      }
    );

    return code;
  }

  static async validateMagicLink(code: string) {
    const { id, userId } = await MagicLinkRepository.findByCode(code);

    if (!id) {
      throw AppError('auth', 'invalid magic link', 400);
    }

    await MagicLinkRepository.delete(id);

    return userId as LongId;
  }
}

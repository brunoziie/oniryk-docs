import prisma from '@app/start/database';
import { nanoid } from 'nanoid';
import ms from 'ms';
import { MailerService } from '../core/mailer';
import MagicLinkMail, { MagicLinkEmailProps } from '@app/resources/emails/magic-link';

export type UserId = string;

const CODE_LENGTH = 32;

export default class MagicLinkService {
  static async sendMagicLink(email: string) {
    const user = await prisma.user.findFirst({ where: { email, deletedAt: null } });

    if (!user) {
      throw new Error('Auth: User not found');
    }

    const magicLink = {
      userId: user.id,
      code: nanoid(CODE_LENGTH),
      expiresAt: new Date(Date.now() + ms('10 minutes')),
    };

    await prisma.magicLink.create({ data: magicLink });

    await MailerService.send<typeof MagicLinkMail, MagicLinkEmailProps>(
      {
        to: user.email,
        subject: 'Magic Link',
      },
      MagicLinkMail,
      {
        name: user.displayName.split(' ')[0],
        code: magicLink.code,
      }
    );

    return magicLink;
  }

  static async findMagicLink(code: string) {
    const link = await prisma.magicLink.findFirst({
      where: {
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!link) {
      throw new Error('Auth: Invalid and/or expired magic link');
    }

    return link;
  }

  static async validateMagicLink(code: string) {
    const { id, userId } = await this.findMagicLink(code);

    await prisma.magicLink.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return userId as UserId;
  }
}

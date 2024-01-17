import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import ms from 'ms';
import { MailerService } from '../core/mailer';
import MagicLinkMail, { MagicLinkEmailProps } from '@/src/resources/emails/magic-link';
import { randomUUID } from 'crypto';

export type UserId = string;

const CODE_LENGTH = 32;

export default class MagicLinkService {
  static async sendMagicLink(db: Knex, email: string) {
    const user = await db('users').where({ email, deleted_at: null }).first();

    if (!user) {
      throw new Error('Auth: User not found');
    }

    const magicLink = {
      id: randomUUID(),
      user_id: user.id,
      code: nanoid(CODE_LENGTH),
      expires_at: new Date(Date.now() + ms('10 minutes')),
    };

    await db('magic_links').insert(magicLink);

    await MailerService.send<typeof MagicLinkMail, MagicLinkEmailProps>(
      {
        to: user.email,
        subject: 'Magic Link',
      },
      MagicLinkMail,
      {
        name: user.display_name.split(' ').shift(),
        code: magicLink.code,
      }
    );

    return magicLink;
  }

  static async findMagicLink(db: Knex, code: string) {
    const link = await db('magic_links')
      .where({ code, deleted_at: null })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!link) {
      throw new Error('Auth: Invalid and/or expired magic link');
    }

    return link;
  }

  static async validateMagicLink(db: Knex, code: string) {
    const { id, user_id: userId } = await this.findMagicLink(db, code);
    await db('magic_links').where({ id }).update({ deleted_at: new Date() });
    return userId as UserId;
  }
}

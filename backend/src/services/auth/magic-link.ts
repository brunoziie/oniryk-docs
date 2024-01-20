import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import ms from 'ms';
import { MailerService } from '../core/mailer';
import MagicLinkMail, { MagicLinkEmailProps } from '@app/resources/emails/magic-link';
import db, { firstBy, insert, query, remove, update } from '@app/database';

export type UserId = string;

const CODE_LENGTH = 32;

export default class MagicLinkService {
  static async sendMagicLink(email: string) {
    const user = await firstBy('users', { email });

    if (!user) {
      throw new Error('Auth: User not found');
    }

    const magicLink = {
      user_id: user.id,
      code: nanoid(CODE_LENGTH),
      expires_at: new Date(Date.now() + ms('10 minutes')),
    };

    await insert('magic_links', magicLink);

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

  static async findMagicLink(code: string) {
    const link = await query('magic_links', { code })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!link) {
      throw new Error('Auth: Invalid and/or expired magic link');
    }

    return link;
  }

  static async validateMagicLink(code: string) {
    const { id, user_id: userId } = await this.findMagicLink(code);

    await db('magic_links').where({ id }).update({ deleted_at: new Date() });
    await remove('magic_links', id);

    return userId as UserId;
  }
}

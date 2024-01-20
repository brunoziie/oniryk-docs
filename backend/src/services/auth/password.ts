import { encrypt, compare } from '@app/helpers/bcrypt';
import { nanoid } from 'nanoid';
import ms from 'ms';
import { MailerService } from '../core/mailer';
import db, { insert, firstBy, query, remove, update } from '@app/database';

import ResetPasswordEmail, {
  ResetPasswordEmailProps,
} from '@/src/resources/emails/reset-password';

export class PasswordService {
  static async login(email: string, password: string) {
    const user = await firstBy('users', { email });

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
    const user = await db('users').where({ email, deleted_at: null }).first();

    if (!user) {
      throw new Error('Auth: Invalid user email');
    }

    const code = nanoid(64);

    await insert('users', {
      user_id: user.id,
      code,
      expires_at: new Date(Date.now() + ms('10 minutes')),
    });

    MailerService.sendLater<typeof ResetPasswordEmail, ResetPasswordEmailProps>(
      {
        to: user.email,
        subject: 'Password recovery',
      },
      ResetPasswordEmail,
      { code, name: user.display_name.split(' ')[0] }
    );
  }

  static async reset(code: string, password: string) {
    const recovery = await query('password_recoveries', { code })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!recovery) {
      throw new Error('Auth: Invalid and/or expired recovery code');
    }

    const { id, user_id: userId } = recovery;

    await remove('password_recoveries', id);
    await update('users', userId, {
      password: await encrypt(password),
    });
  }
}

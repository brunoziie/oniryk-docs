import { encrypt, compare } from '@app/helpers/bcrypt';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import ms from 'ms';
import { MailerService } from '../core/mailer';
import ResetPasswordEmail, {
  ResetPasswordEmailProps,
} from '@/src/resources/emails/reset-password';

export class PasswordService {
  static async login(db: Knex, email: string, password: string) {
    const user = await db('users').where({ email, deleted_at: null }).first();

    if (!user) {
      throw new Error('Auth: Invalid credentials');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Auth: Invalid credentials');
    }

    return user.id as string;
  }

  static async forgot(db: Knex, email: string) {
    const user = await db('users').where({ email, deleted_at: null }).first();

    if (!user) {
      throw new Error('Auth: Invalid user email');
    }

    const recovery = {
      id: randomUUID(),
      user_id: user.id,
      code: nanoid(64),
      expires_at: new Date(Date.now() + ms('10 minutes')),
    };

    await db('password_recoveries').insert(recovery);

    MailerService.sendLater<typeof ResetPasswordEmail, ResetPasswordEmailProps>(
      {
        to: user.email,
        subject: 'Password recovery',
      },
      ResetPasswordEmail,
      { code: recovery.code, name: user.display_name.split(' ')[0] }
    );
  }

  static async reset(db: Knex, code: string, password: string) {
    const recovery = await db('password_recoveries')
      .where({ code, deleted_at: null })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!recovery) {
      throw new Error('Auth: Invalid and/or expired recovery code');
    }

    await db('password_recoveries').where({ id: recovery.id }).update({
      deleted_at: new Date(),
    });

    await db('users')
      .where({ id: recovery.user_id })
      .update({
        password: await encrypt(password),
      });
  }
}

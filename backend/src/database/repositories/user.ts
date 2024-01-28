import { encrypt } from '@app:helpers/bcrypt';
import { db } from '@db:client';
import { User, UserInsert, users } from '@db:schemas';
import { MySqlDBTransaction, form } from '@db:utils';
import { randomUUID } from 'crypto';
import { and, eq, isNull, ne, or } from 'drizzle-orm';

export class UserRepository {
  static async create(user: UserInsert, trx?: MySqlDBTransaction) {
    const values: UserInsert = { ...user };
    values.id = randomUUID();
    await (trx || db).insert(users).values(values);
    return values.id;
  }

  static async find(id: string, trx?: MySqlDBTransaction) {
    const [user] = await (trx || db)
      .select()
      .from(users)
      .where(and(eq(users.id, id), isNull(users.deletedAt)));

    return user;
  }

  static async findByEmail(email: string, trx?: MySqlDBTransaction) {
    const [user] = await (trx || db)
      .select()
      .from(users)
      .where(and(eq(users.email, email), isNull(users.deletedAt)));

    return user;
  }

  static async update(id: string, user: Partial<User>, trx?: MySqlDBTransaction) {
    const { values, ...formdata } = form(user, [
      'displayName',
      'username',
      'email',
      'githubId',
      'googleId',
      'avatar',
      'password',
    ]);

    if (values.password) {
      values.password = await encrypt(values.password);
    }

    if (formdata.isNotEmpty()) {
      await (trx || db)
        .update(users)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(users.id, id), isNull(users.deletedAt)));
    }
  }

  static async delete(id: string, trx?: MySqlDBTransaction) {
    return await (trx || db)
      .update(users)
      .set({ deletedAt: new Date() })
      .where(and(eq(users.id, id), isNull(users.deletedAt)));
  }

  static async changePassword(id: string, password: string, trx?: MySqlDBTransaction) {
    return await (trx || db)
      .update(users)
      .set({ password: await encrypt(password), updatedAt: new Date() })
      .where(and(eq(users.id, id), isNull(users.deletedAt)));
  }

  static async emailExists(email: string, userId?: string, trx?: MySqlDBTransaction) {
    const conditions = [eq(users.email, email), isNull(users.deletedAt)];

    if (userId) {
      conditions.push(ne(users.id, userId));
    }

    const [user] = await (trx || db)
      .select()
      .from(users)
      .where(and(...conditions));

    return !!user;
  }

  static async findByEmailOrGithubId(
    email: string,
    githubId: string,
    trx?: MySqlDBTransaction
  ) {
    const [user] = await (trx || db)
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.email, email), eq(users.githubId, githubId)),
          isNull(users.deletedAt)
        )
      );

    return user;
  }

  static async findByEmailOrGoogleId(
    email: string,
    googleId: string,
    trx?: MySqlDBTransaction
  ) {
    const [user] = await (trx || db)
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.email, email), eq(users.googleId, googleId)),
          isNull(users.deletedAt)
        )
      );

    return user;
  }
}

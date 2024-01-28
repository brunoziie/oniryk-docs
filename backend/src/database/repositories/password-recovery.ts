import env from '@app:env';
import { db } from '@db:client';
import { User, passwordRecoveries } from '@db:schemas';
import { and, eq, gt, isNull, lt } from 'drizzle-orm';
import ms from 'ms';
import { randomUUID } from 'node:crypto';

import { MySqlDBTransaction } from '@db:utils';

const TEST_CODE = '00000000-0000-0000-0000-000000000000';

export class PasswordRecoveryRepository {
  static async create(user: User, trx?: MySqlDBTransaction) {
    const code = env.NODE_ENV === 'test' ? TEST_CODE : randomUUID();

    await (trx || db).insert(passwordRecoveries).values({
      userId: user.id,
      code,
      expiresAt: new Date(Date.now() + ms('10 minutes')),
    });

    return code;
  }

  static async findByCode(code: string, trx?: MySqlDBTransaction) {
    const [recovery] = await (trx || db)
      .select()
      .from(passwordRecoveries)
      .where(
        and(
          eq(passwordRecoveries.code, code),
          isNull(passwordRecoveries.deletedAt),
          gt(passwordRecoveries.expiresAt, new Date())
        )
      );

    return recovery;
  }

  static async delete(id: string, trx?: MySqlDBTransaction) {
    await (trx || db)
      .update(passwordRecoveries)
      .set({ deletedAt: new Date() })
      .where(eq(passwordRecoveries.id, id));
  }
}

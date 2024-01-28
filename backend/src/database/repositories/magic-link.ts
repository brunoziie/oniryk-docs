import env from '@app:env';
import { db } from '@db:client';
import { User, magicLinks, passwordRecoveries } from '@db:schemas';
import { MySqlDBTransaction } from '@db:utils';
import { randomUUID } from 'crypto';
import { and, eq, isNull, gt } from 'drizzle-orm';

import ms from 'ms';

const TEST_CODE = '11111111-0000-0000-0000-000000000000';

export class MagicLinkRepository {
  static async create(user: User, trx?: MySqlDBTransaction) {
    const code = env.NODE_ENV === 'test' ? TEST_CODE : randomUUID();

    await (trx || db).insert(magicLinks).values({
      userId: user.id,
      code,
      expiresAt: new Date(Date.now() + ms('10 minutes')),
    });

    return code;
  }

  static async findByCode(code: string, trx?: MySqlDBTransaction) {
    const [recovery] = await (trx || db)
      .select()
      .from(magicLinks)
      .where(
        and(
          eq(magicLinks.code, code),
          isNull(magicLinks.deletedAt),
          gt(magicLinks.expiresAt, new Date())
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

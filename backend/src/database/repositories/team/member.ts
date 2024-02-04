import { AppError } from '@app:helpers/error';
import { LongId } from '@app:helpers/id';
import { db } from '@db:client';
import { OwnershipLevel, ownerships, users } from '@db:schemas';
import { MySqlDBTransaction, fulltext } from '@db:utils';
import { and, eq, isNull } from 'drizzle-orm';

export default class TeamMemberRepository {
  static async all(id: LongId, search?: string, tx?: MySqlDBTransaction) {
    const rows = await (tx || db)
      .select({ ownerships, users })
      .from(ownerships)
      .leftJoin(users, and(eq(ownerships.userId, users.id), isNull(users.deletedAt)))
      .where(
        and(
          eq(ownerships.entityId, id),
          eq(ownerships.entity, 'team'),
          isNull(ownerships.deletedAt),
          ...(search ? [fulltext([users.displayName], search)] : [])
        )
      );

    return rows.map((row) => {
      return {
        type: 'user',
        id: row.ownerships.userId,
        name: row.users!.displayName,
        level: row.ownerships.level,
      };
    });
  }

  static async create(
    teamId: LongId,
    userId: LongId,
    level: OwnershipLevel,
    tx?: MySqlDBTransaction
  ) {
    const exists = await (tx || db)
      .select()
      .from(ownerships)
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'team'),
          eq(ownerships.userId, userId),
          isNull(ownerships.deletedAt)
        )
      );

    if (exists.length) {
      throw AppError('team', 'user already a member of this team', 400);
    }

    return await (tx || db).insert(ownerships).values({
      entityId: teamId,
      entity: 'team',
      teamId: null,
      userId,
      level,
    });
  }

  static async update(
    teamId: LongId,
    userId: LongId,
    level: OwnershipLevel,
    tx?: MySqlDBTransaction
  ) {
    return await (tx || db)
      .update(ownerships)
      .set({ level })
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'team'),
          eq(ownerships.userId, userId),
          isNull(ownerships.deletedAt)
        )
      );
  }

  static async delete(teamId: LongId, userId: LongId, tx?: MySqlDBTransaction) {
    return await (tx || db)
      .update(ownerships)
      .set({ deletedAt: new Date() })
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'team'),
          eq(ownerships.userId, userId),
          isNull(ownerships.deletedAt)
        )
      );
  }

  static async hasOwnerOnTeam(teamId: LongId, tx?: MySqlDBTransaction) {
    const rows = await (tx || db)
      .select()
      .from(ownerships)
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'team'),
          eq(ownerships.level, 'owner'),
          isNull(ownerships.deletedAt)
        )
      );

    return !!rows.length;
  }
}

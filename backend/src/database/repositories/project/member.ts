import { LongId } from '@app:helpers/id';
import { db } from '@db:client';
import { OwnershipLevel, ownerships, teams, users } from '@db:schemas';
import { MySqlDBTransaction } from '@db:utils';
import { and, eq, isNull } from 'drizzle-orm';

export type MemberType = 'team' | 'user';

export default class TeamMemberRepository {
  static async all(id: LongId, tx?: MySqlDBTransaction) {
    const rows = await (tx || db)
      .select({ ownerships, users, teams })
      .from(ownerships)
      .leftJoin(users, and(eq(ownerships.userId, users.id), isNull(users.deletedAt)))
      .leftJoin(teams, and(eq(ownerships.teamId, teams.id), isNull(teams.deletedAt)))
      .where(
        and(
          eq(ownerships.entityId, id),
          eq(ownerships.entity, 'project'),
          isNull(ownerships.deletedAt)
        )
      );

    return rows.map((row) => {
      return {
        type: row.ownerships.teamId ? 'team' : 'user',
        id: row.ownerships.teamId || row.ownerships.userId,
        name: row.ownerships.teamId ? row.teams?.name : row.users?.displayName,
        level: row.ownerships.level,
      };
    });
  }

  static async create(
    projectId: LongId,
    type: MemberType,
    relatedId: LongId,
    level: OwnershipLevel,
    tx?: MySqlDBTransaction
  ) {
    const exists = await (tx || db)
      .select()
      .from(ownerships)
      .where(
        and(
          eq(ownerships.entityId, projectId),
          eq(ownerships.entity, 'project'),
          type === 'team'
            ? eq(ownerships.teamId, relatedId)
            : eq(ownerships.userId, relatedId),
          isNull(ownerships.deletedAt)
        )
      );

    if (exists.length) {
      return this.update(projectId, type, relatedId, level, tx);
    }

    return await (tx || db).insert(ownerships).values({
      entityId: projectId,
      entity: 'project',
      ...(type === 'team'
        ? { teamId: relatedId, userId: null }
        : { userId: relatedId, teamId: null }),
      level,
    });
  }

  static async update(
    teamId: LongId,
    type: MemberType,
    relatedId: LongId,
    level: OwnershipLevel,
    tx?: MySqlDBTransaction
  ) {
    return await (tx || db)
      .update(ownerships)
      .set({ level })
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'project'),
          type === 'team'
            ? eq(ownerships.teamId, relatedId)
            : eq(ownerships.userId, relatedId),
          isNull(ownerships.deletedAt)
        )
      );
  }

  static async delete(
    teamId: LongId,
    type: MemberType,
    relatedId: LongId,
    tx?: MySqlDBTransaction
  ) {
    return await (tx || db)
      .update(ownerships)
      .set({ deletedAt: new Date() })
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'project'),
          type === 'team'
            ? eq(ownerships.teamId, relatedId)
            : eq(ownerships.userId, relatedId),
          isNull(ownerships.deletedAt)
        )
      );
  }

  static async hasOwnerOnProject(teamId: LongId) {
    const rows = await db
      .select()
      .from(ownerships)
      .where(
        and(
          eq(ownerships.entityId, teamId),
          eq(ownerships.entity, 'project'),
          eq(ownerships.level, 'owner'),
          isNull(ownerships.deletedAt)
        )
      );

    return !!rows.length;
  }
}

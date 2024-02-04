import { AuthUser } from '@app:contracts/auth.contract';
import { db } from '@db:client';
import { Team, ownerships, teams } from '@db:schemas';
import { MySqlDBTransaction, fulltext } from '@db:utils';
import { and, eq, inArray, isNull, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';

export default class TeamRepository {
  static async all(
    user: AuthUser,
    page: number = 1,
    perPage: number,
    query?: string,
    tx?: MySqlDBTransaction
  ) {
    const [total] = await (tx || db)
      .select({ count: sql<number>`COUNT(${teams.id})` })
      .from(teams)
      .innerJoin(
        ownerships,
        and(
          eq(ownerships.entityId, teams.id),
          eq(ownerships.entity, 'team'),
          eq(ownerships.userId, user.id),
          isNull(ownerships.deletedAt)
        )
      )
      .where(
        and(isNull(teams.deletedAt), ...(query ? [fulltext([teams.name], query)] : []))
      );

    const rows = await (tx || db)
      .select()
      .from(teams)
      .innerJoin(
        ownerships,
        and(
          eq(ownerships.entityId, teams.id),
          eq(ownerships.entity, 'team'),
          eq(ownerships.userId, user.id),
          isNull(ownerships.deletedAt)
        )
      )
      .where(
        and(isNull(teams.deletedAt), ...(query ? [fulltext([teams.name], query)] : []))
      )
      .limit(perPage)
      .offset((page - 1) * perPage);

    return {
      rows: rows.map((p) => p.teams),
      total: total.count,
      page,
      perPage,
    };
  }

  static async find(teamId: string, tx?: MySqlDBTransaction) {
    const [team] = await (tx || db)
      .select()
      .from(teams)
      .where(and(eq(teams.id, teamId), isNull(teams.deletedAt)));

    return team || null;
  }

  static async members(userId: string, tx?: MySqlDBTransaction): Promise<Team[]> {
    const ownershipSq = (tx || db)
      .select({ id: ownerships.entityId })
      .from(ownerships)
      .where(and(eq(ownerships.entity, 'team'), eq(ownerships.userId, userId)));

    return await (tx || db)
      .select()
      .from(teams)
      .where(and(inArray(teams.id, ownershipSq), isNull(teams.deletedAt)));
  }

  static async create(name: string, userId: string) {
    const id = randomUUID();

    await db.transaction(async (tx) => {
      await tx.insert(teams).values({ id, name });
      await tx.insert(ownerships).values({
        entity: 'team',
        entityId: id,
        userId,
        teamId: null,
        level: 'owner',
      });
    });

    return id;
  }

  static async update(id: string, data: Partial<Team>, tx?: MySqlDBTransaction) {
    return await (tx || db).update(teams).set(data).where(eq(teams.id, id));
  }

  static async delete(id: string, tx?: MySqlDBTransaction) {
    return await (tx || db)
      .update(teams)
      .set({ deletedAt: new Date() })
      .where(eq(teams.id, id));
  }
}

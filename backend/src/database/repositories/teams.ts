import { db } from '@db:client';
import { Team, ownerships, teams } from '@db:schemas';
import { MySqlDBTransaction } from '@db:utils';
import { and, eq, inArray, isNull } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';

export default class TeamRepository {
  static async getMembers(userId: string, tx?: MySqlDBTransaction): Promise<Team[]> {
    const ownershipSq = (tx || db)
      .select({ id: ownerships.entityId })
      .from(ownerships)
      .where(and(eq(ownerships.entity, 'team'), eq(ownerships.userId, userId)));

    return await (tx || db)
      .select()
      .from(teams)
      .where(and(inArray(teams.id, ownershipSq), isNull(teams.deletedAt)));
  }

  static async createTeam(name: string, userId: string) {
    const id = randomUUID();

    await db.transaction(async (tx) => {
      await tx.insert(teams).values({ id, name });
      await tx.insert(ownerships).values({
        entity: 'team',
        entityId: id,
        userId,
        level: 'owner',
      });
    });

    return id;
  }
}

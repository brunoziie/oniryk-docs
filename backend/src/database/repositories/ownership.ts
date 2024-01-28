import { and, eq, or, inArray } from 'drizzle-orm';
import { db } from '@db:client';
import { ownerships, Ownership, EntityType, OwnershipLevel } from '@db:schemas';

export type AddToUserParams = Pick<Ownership, 'entity' | 'entityId' | 'userId' | 'level'>;
export type AddToTeamParams = Omit<AddToUserParams, 'userId'> & { teamId: string };

export default class OwnershipRepository {
  static async getEntityOwnership(
    entity: AddToUserParams['entity'],
    entityId: string,
    userId: string,
    levels: OwnershipLevel[]
  ) {
    // User teams
    const teams = (
      await db
        .select({ entityId: ownerships.entityId })
        .from(ownerships)
        .where(and(eq(ownerships.entity, 'team'), eq(ownerships.userId, userId)))
    ).map((c) => c.entityId);

    // Conditional query for users/teams
    const related = teams.length
      ? or(eq(ownerships.userId, userId), inArray(ownerships.teamId, teams))
      : eq(ownerships.userId, userId);

    const [ownership] = await db
      .select()
      .from(ownerships)
      .where(
        and(
          eq(ownerships.entity, entity),
          eq(ownerships.entityId, entityId),
          related,
          inArray(ownerships.level, levels)
        )
      );

    return ownership || null;
  }

  static async addEntityOwnership(
    entity: EntityType,
    params: AddToTeamParams | AddToUserParams
  ) {
    return await db.insert(ownerships).values({
      entity,
      entityId: params.entityId,
      ...((params as AddToUserParams).userId
        ? { userId: (params as AddToUserParams).userId }
        : { teamId: (params as AddToTeamParams).teamId }),
      level: params.level,
    } as typeof ownerships.$inferInsert);
  }
}

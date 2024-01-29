import { db } from '@db:client';
import { EntityType, Ownership, OwnershipLevel, ownerships } from '@db:schemas';
import { and, eq, inArray, or } from 'drizzle-orm';

export type AddToUserParams = Pick<Ownership, 'entity' | 'entityId' | 'userId' | 'level'>;
export type AddToTeamParams = Omit<AddToUserParams, 'userId'> & { teamId: string };

const hierarchy: OwnershipLevel[] = ['owner', 'writer', 'viewer'];

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

    const results = await db
      .select()
      .from(ownerships)
      .where(
        and(
          eq(ownerships.entity, entity),
          eq(ownerships.entityId, entityId),
          related,
          ...(levels.length ? [inArray(ownerships.level, levels)] : [])
        )
      );

    if (!results.length) {
      return null;
    }

    const highest = results.reduce((acc, curr) => {
      const index = hierarchy.indexOf(curr.level);
      return index < hierarchy.indexOf(acc.level) ? curr : acc;
    }, results[0]);

    return highest;
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

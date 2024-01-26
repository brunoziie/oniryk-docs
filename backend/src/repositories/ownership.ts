import prisma from '@app/start/database';
import { EntityType, OwnershipLevel } from '@prisma/client';
import { $in, $or } from '@app/helpers/prisma';

export type AddToUserParams = {
  entity: EntityType;
  entityId: string;
  userId: string;
  level: OwnershipLevel;
};

export type AddToTeamParams = Omit<AddToUserParams, 'userId'> & {
  teamId: string;
};

export default class OwnershipRepository {
  static async getEntityOwnership(
    entity: EntityType,
    entityId: string,
    userId: string,
    teams: string[],
    levels: OwnershipLevel[]
  ) {
    return await prisma.ownership.findFirst({
      where: {
        entity,
        entityId,

        ...(teams.length > 0
          ? $or({ userId: userId }, $in('teamId', teams))
          : { userId }),

        ...$in('level', levels),
      },
    });
  }

  static async addEntityOwnership(
    entity: EntityType,
    params: AddToTeamParams | AddToUserParams
  ) {
    return await prisma.ownership.create({
      data: {
        entity,
        entityId: params.entityId,
        ...((params as AddToUserParams).userId
          ? { userId: (params as AddToUserParams).userId }
          : { teamId: (params as AddToTeamParams).teamId }),
        level: params.level,
      },
    });
  }
}

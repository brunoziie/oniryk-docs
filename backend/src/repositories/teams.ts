import prisma from '@app/start/database';
import { Team } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export default class TeamRepository {
  static async getUserTeams(userId: string) {
    return await prisma.$queryRaw<Team[]>`
      SELECT * FROM teams WHERE id IN (
        SELECT entity_id FROM ownerships 
        WHERE userId = ${userId} AND entity = "team"
      )
    `;
  }

  static async createTeam(name: string, userId: string) {
    const id = randomUUID();

    prisma.$transaction([
      prisma.team.create({
        data: { id, name },
      }),
      prisma.ownership.create({
        data: {
          userId,
          entity: 'team',
          entityId: id,
          level: 'owner',
        },
      }),
    ]);

    return id;
  }
}

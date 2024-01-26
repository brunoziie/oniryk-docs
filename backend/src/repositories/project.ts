import prisma from '@app/start/database';
import { EntityType, OwnershipLevel, Project } from '@prisma/client';
import { $in, $int, $or } from '@app/helpers/prisma';
import { CreateProjectPayload, UpdateProjectPayload } from '../schemas/project.schema';
import { AuthUser } from '../contracts/auth.contract';
import TeamRepository from './teams';
import { PaginationContract } from '../contracts/pagination.contract';
import { randomUUID } from 'node:crypto';

export default class ProjectRepository {
  static async allProjects(
    user: AuthUser,
    page = 1,
    perPage = 50
  ): Promise<PaginationContract<Project>> {
    const teams = await TeamRepository.getUserTeams(user.id);

    const total = await prisma.$queryRaw<{ total: BigInt }[]>`
      SELECT COUNT(DISTINCT p.id) as total
      FROM projects p
      LEFT JOIN ownerships o ON o.entity_id = p.id AND o.entity = 'project'
      WHERE o.userId = ${user.id} OR o.teamId IN (${teams.map((team) => team.id).join(',')})
    `;

    const projects = await prisma.$queryRaw<Project[]>`
      SELECT p.*
      FROM projects p
      LEFT JOIN ownerships o ON o.entity_id = p.id and o.entity = 'project'
      WHERE o.userId = ${user.id} OR o.teamId IN (${teams.map((team) => team.id).join(',')})
      GROUP BY p.id
      LIMIT ${page} OFFSET ${(page - 1) * perPage}
    `;

    return {
      rows: projects,
      total: $int(total[0].total),
      page,
      perPage,
    };
  }

  static async getProject(id: string) {
    return await prisma.project.findFirst({
      where: {
        id,
      },
    });
  }

  static async createProject(user: AuthUser, data: CreateProjectPayload) {
    const id = randomUUID();

    await prisma.$transaction([
      prisma.project.create({ data: { ...data, id } }),
      prisma.ownership.create({
        data: {
          entity: 'project',
          entityId: id,
          userId: user.id,
          level: 'owner',
        },
      }),
    ]);

    return id;
  }

  static async updateProject(id: string, data: UpdateProjectPayload) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }

  static async getProjectMembers(id: string) {
    return await prisma.ownership.findMany({
      where: {
        entityId: id,
        entity: 'project',
      },

      include: {
        user: true,
        team: true,
      },
    });
  }
}

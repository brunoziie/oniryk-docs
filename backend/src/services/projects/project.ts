import { AuthUser } from '@app/contracts/auth.contract';
import { CreateProjectPayload, UpdateProjectPayload } from '@app/schemas/project.schema';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

export default class ProjectCrudService {
  static async getProject(user: AuthUser, id: string) {
    return await prisma.project.findFirst({
      where: {
        id,
        ownerships: {
          some: {
            userId: user.id,
            entity: 'project',
          },
        },
      },
    });
  }

  static async create(user: AuthUser, data: CreateProjectPayload) {
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

  static async updateProject(user: AuthUser, id: string, data: UpdateProjectPayload) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }
}

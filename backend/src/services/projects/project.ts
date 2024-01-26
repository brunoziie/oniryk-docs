import { AuthUser } from '@app/contracts/auth.contract';
import { CreateProjectPayload, UpdateProjectPayload } from '@app/schemas/project.schema';
import { randomUUID } from 'node:crypto';
import prisma from '@app/start/database';
import ProjectRepository from '@/src/repositories/project';
import OwnershipRepository from '@/src/repositories/ownership';

export default class ProjectCrudService {
  static async allProjects(user: AuthUser, page = 1, perPage = 50) {
    return await ProjectRepository.allProjects(user, page, perPage);
  }

  static async getProject(user: AuthUser, id: string, withMembers = false) {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!project) {
      return null;
    }

    if (withMembers) {
      const members = await ProjectRepository.getProjectMembers(id);
      return {
        ...project,
        members: members.map((member) => ({
          type: member.user ? 'user' : 'team',
          id: member.user ? member.user.id : member.team?.id,
          name: member.user ? member.user.username : member.team?.name,
          level: member.level,
        })),
      };
    }

    return project;
  }

  static async create(user: AuthUser, data: CreateProjectPayload) {
    return ProjectRepository.createProject(user, data);
  }

  static async updateProject(id: string, data: UpdateProjectPayload) {
    return await prisma.project.update({
      where: { id, deletedAt: null },
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  static async deleteProject(id: string) {
    return await prisma.project.delete({
      where: { id },
    });
  }
}

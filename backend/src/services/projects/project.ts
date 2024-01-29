import { AuthUser } from '@app:contracts/auth.contract';
import ProjectRepository from '@db:repositories/project';
import { Project, ProjectInsert } from '@db:schemas';
import { Updatable } from '@db:utils';

export default class ProjectCrudService {
  static async all(user: AuthUser, page = 1, perPage = 50, query?: string) {
    return await ProjectRepository.all(user, page, perPage, query);
  }

  static async getProject(user: AuthUser, id: string, withMembers = false) {
    const project = await ProjectRepository.findForUser(user, id);

    if (!project) {
      return null;
    }

    if (withMembers) {
      const members = await ProjectRepository.getMembers(id);
      return { ...project, members };
    }

    return project;
  }

  static async create(user: AuthUser, data: ProjectInsert) {
    return ProjectRepository.create(user, data);
  }

  static async updateProject(id: string, data: Updatable<Project>) {
    return await ProjectRepository.update(id, data);
  }

  static async deleteProject(id: string) {
    return await ProjectRepository.delete(id);
  }
}

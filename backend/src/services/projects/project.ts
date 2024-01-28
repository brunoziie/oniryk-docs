import { AuthUser } from '@app:contracts/auth.contract';
import ProjectRepository from '@db:repositories/project';
import { Project, ProjectInsert } from '@db:schemas';
import { Updatable } from '@db:utils';

export default class ProjectCrudService {
  static async allProjects(user: AuthUser, page = 1, perPage = 50) {
    return await ProjectRepository.allProjects(user, page, perPage);
  }

  static async getProject(user: AuthUser, id: string, withMembers = false) {
    const project = await ProjectRepository.findForUser(user, id);

    if (!project) {
      return null;
    }

    if (withMembers) {
      const members = await ProjectRepository.getProjectMembers(id);
      return { ...project, members };
    }

    return project;
  }

  static async create(user: AuthUser, data: ProjectInsert) {
    return ProjectRepository.createProject(user, data);
  }

  static async updateProject(id: string, data: Updatable<Project>) {
    return await ProjectRepository.updateProject(id, data);
  }

  static async deleteProject(id: string) {
    return await ProjectRepository.delete(id);
  }
}

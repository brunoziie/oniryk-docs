import { HttpContextContract } from '@app:contracts/http.contract';
import { Project } from '@db:schemas';
import { Updatable } from '@db:utils';
import { withPagination, withSuccess } from '../helpers/http';
import ProjectCrudService from '../services/projects/project';
import { CreateProjectPayload } from '../validators/project.schema';

export default class ProjectsController {
  static async index({ response, request }: HttpContextContract) {
    const projects = await ProjectCrudService.allProjects(
      request.user!,
      request.filters.page,
      request.filters.perPage
    );

    withPagination(response, projects);
  }

  static async show({ request, response }: HttpContextContract) {
    const project = await ProjectCrudService.getProject(
      request.user!,
      request.params.id,
      true
    );

    withSuccess(response, project);
  }

  static async store({ request, response }: HttpContextContract) {
    const { title, description } = request.payload as CreateProjectPayload;
    const user = request.user!;
    const id = await ProjectCrudService.create(user, { title, description });

    response.redirect(`/projects/${id}`);
  }

  static async update({ request, response }: HttpContextContract) {
    const { id } = request.params;
    const data = request.payload as Updatable<Project>;
    await ProjectCrudService.updateProject(id, data);

    response.redirect(`/projects/${request.params.id}`);
  }

  static async destroy({ request, response }: HttpContextContract) {
    await ProjectCrudService.deleteProject(request.params.id);

    withSuccess(response);
  }
}

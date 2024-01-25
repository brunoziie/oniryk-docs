import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '../helpers/http';
import { CreateProjectPayload, UpdateProjectPayload } from '../schemas/project.schema';
import ProjectCrudService from '../services/projects/project';

export default class ProjectsController {
  static async index({ response }: HttpContextContract) {
    withSuccess(response, { now: new Date().getTime() });
  }

  static async store({ request, response }: HttpContextContract) {
    const { title, description } = request.payload as CreateProjectPayload;
    const id = await ProjectCrudService.create(request.user!, { title, description });
    response.redirect(`/projects/${id}`);
  }

  static async show({ request, response }: HttpContextContract) {
    const project = await ProjectCrudService.getProject(request.user!, request.params.id);
    withSuccess(response, project);
  }

  static async update({ request, response }: HttpContextContract) {
    const { title, description } = request.payload as UpdateProjectPayload;
    const project = await ProjectCrudService.updateProject(
      request.user!,
      request.params.id,
      { title, description }
    );
    withSuccess(response, project);
  }
}

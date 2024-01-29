import { HttpContextContract } from '@app:contracts/http.contract';
import { Project } from '@db:schemas';
import { Updatable } from '@db:utils';
import { withPagination, withSuccess } from '../helpers/http';
import ProjectCrudService from '../services/projects/project';
import { CreateProjectPayload } from '../validators/project.schema';

export default class ProjectsController {
  static async index(ctx: HttpContextContract) {
    const filters = ctx.get('filters');
    const user = ctx.get('user')!;
    const projects = await ProjectCrudService.all(
      user,
      filters.page,
      filters.limit,
      filters.q
    );

    return withPagination(ctx, projects);
  }

  static async show(ctx: HttpContextContract) {
    const user = ctx.get('user')!;
    const { id } = ctx.req.param() as Record<string, string>;
    const project = await ProjectCrudService.getProject(user, id, true);

    return withSuccess(ctx, project);
  }

  static async store(ctx: HttpContextContract) {
    const { title, description } = ctx.get('payload') as CreateProjectPayload;
    const user = ctx.get('user')!;
    const id = await ProjectCrudService.create(user, { title, description });

    return ctx.redirect(`/projects/${id}`);
  }

  static async update(ctx: HttpContextContract) {
    const { id } = ctx.req.param() as Record<string, string>;
    const data = ctx.get('payload') as Updatable<Project>;
    await ProjectCrudService.updateProject(id, data);

    return withSuccess(ctx);
  }

  static async destroy(ctx: HttpContextContract) {
    const { id } = ctx.req.param() as Record<string, string>;
    await ProjectCrudService.deleteProject(id);

    return withSuccess(ctx);
  }
}

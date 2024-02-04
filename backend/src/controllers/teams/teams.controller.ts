import { HttpContextContract } from '@app:contracts/http.contract';
import { cleaner } from '@app:helpers/cleaner';
import { withPagination, withSuccess } from '@app:helpers/http';
import TeamService from '@app:services/teams/teams';
import { CreateTeamPayload } from '@app:validators/team.schema';

export default class TeamsController {
  static async index(ctx: HttpContextContract) {
    const filters = ctx.get('filters');
    const user = ctx.get('user')!;
    const teams = await TeamService.all(user, filters.page, filters.limit, filters.q);

    return withPagination(ctx, cleaner.auto(teams));
  }

  static async show(ctx: HttpContextContract) {
    const { id } = ctx.req.param() as Record<string, string>;
    const team = await TeamService.getTeam(id);

    return withSuccess(ctx, cleaner.auto(team));
  }

  static async store(ctx: HttpContextContract) {
    const { name } = ctx.get('payload') as CreateTeamPayload;
    const user = ctx.get('user')!;
    const id = await TeamService.create(user, { name });

    return ctx.redirect(`/teams/${id}`);
  }

  static async update(ctx: HttpContextContract) {
    const { id } = ctx.req.param() as Record<string, string>;
    const { name } = ctx.get('payload') as CreateTeamPayload;
    await TeamService.update(id, { name });
    const team = await TeamService.getTeam(id);

    return withSuccess(ctx, cleaner.auto(team));
  }

  static async destroy(ctx: HttpContextContract) {
    const { id } = ctx.req.param() as Record<string, string>;
    await TeamService.delete(id);

    return withSuccess(ctx);
  }
}

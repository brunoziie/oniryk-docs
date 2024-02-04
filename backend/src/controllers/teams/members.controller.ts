import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import { TeamMembersService } from '@app:services/teams/members';
import {
  CreateTeamMemberPayload,
  UpdateTeamMemberPayload,
} from '@app:validators/team.schema';

export default class MembersController {
  static async index(ctx: HttpContextContract) {
    const filters = ctx.get('filters');
    const { id } = ctx.req.param() as Record<string, string>;
    const members = await TeamMembersService.all(id, filters.q);

    return withSuccess(ctx, members);
  }

  static async store(ctx: HttpContextContract) {
    const payload = ctx.get('payload') as CreateTeamMemberPayload;
    const { id } = ctx.req.param() as Record<string, string>;
    await TeamMembersService.create(id, payload.userId, payload.level);

    return withSuccess(ctx);
  }

  static async update(ctx: HttpContextContract) {
    const payload = ctx.get('payload') as UpdateTeamMemberPayload;
    const { id, userId } = ctx.req.param() as Record<string, string>;
    await TeamMembersService.update(id, userId, payload.level);

    return withSuccess(ctx);
  }

  static async destroy(ctx: HttpContextContract) {
    const { id, userId } = ctx.req.param() as Record<string, string>;
    await TeamMembersService.remove(id, userId);

    return withSuccess(ctx);
  }
}

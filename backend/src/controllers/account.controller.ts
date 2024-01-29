import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import AccountService from '@app:services/auth/account';
import { User } from '@db:schemas';
import { Updatable } from '@db:utils';

export default class AccountController {
  static async show(ctx: HttpContextContract) {
    const user = ctx.get('user');
    const account = await AccountService.getUserAccount(user!.id);
    return withSuccess(ctx, account);
  }

  static async update(ctx: HttpContextContract) {
    const payload = (await ctx.req.json()) as Updatable<User>;
    const user = ctx.get('user');

    await AccountService.updateUserAccount(user!.id, payload);
    return withSuccess(ctx, {});
  }
}

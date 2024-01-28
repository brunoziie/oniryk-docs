import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import AccountService from '@app:services/auth/account';
import { User } from '@db:schemas';
import { Updatable } from '@db:utils';

export default class AccountController {
  static async show({ request, response }: HttpContextContract) {
    const user = await AccountService.getUserAccount(request.user!.id);
    return withSuccess(response, user);
  }

  static async update({ request, response }: HttpContextContract) {
    const payload = request.payload as Updatable<User>;
    await AccountService.updateUserAccount(request.user!.id, payload);
    return withSuccess(response, {});
  }
}

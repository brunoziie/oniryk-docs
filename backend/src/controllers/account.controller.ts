import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import AccountService from '@app/services/auth/account';
import { UpdateAccountPayload } from './account.schema';
import { safetify } from '@app/database/helpers';

export default class AccountController {
  static async show({ request, response }: HttpContextContract) {
    const user = await AccountService.getUserAccount(request.user.id);
    return withSuccess(response, safetify(user));
  }

  static async update({ request, response }: HttpContextContract) {
    const payload = request.payload as UpdateAccountPayload;
    await AccountService.updateUserAccount(request.user.id, payload);
    return withSuccess(response, {});
  }
}

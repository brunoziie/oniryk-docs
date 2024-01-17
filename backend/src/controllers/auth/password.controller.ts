import { HttpContextContract } from '@/src/contracts/http.contract';
import { withSuccess } from '@/src/helpers/http';
import { PasswordService } from '@/src/services/auth/password';
import { SessionService } from '@/src/services/auth/session';

export default class PasswordController {
  static async login({ request, response, db }: HttpContextContract) {
    const userId = await PasswordService.login(
      db,
      request.inputs!.email as string,
      request.inputs!.password as string
    );

    const session = await SessionService.createSession(db, userId);
    withSuccess(response, { user: session.payload, token: session.token });
  }

  static async forgot({ request, response, db }: HttpContextContract) {
    await PasswordService.forgot(db, request.inputs!.email as string);
    withSuccess(response);
  }

  static async reset({ request, response, db }: HttpContextContract) {
    await PasswordService.reset(
      db,
      request.inputs!.code as string,
      request.inputs!.password as string
    );

    withSuccess(response);
  }
}

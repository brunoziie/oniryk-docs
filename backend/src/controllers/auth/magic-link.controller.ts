import { SessionService } from '@app/services/auth/session';
import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import MagicLinkService from '@app/services/auth/magic-link';

export default class MagicLinkController {
  static async store({ request, response, db }: HttpContextContract) {
    await MagicLinkService.sendMagicLink(db, request.inputs!.email);
    withSuccess(response, {});
  }

  static async login({ request, response, db }: HttpContextContract) {
    const { code } = request.inputs!;
    const userId = await MagicLinkService.validateMagicLink(db, code);
    const session = await SessionService.createSession(db, userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

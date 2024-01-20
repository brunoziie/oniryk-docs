import { SessionService } from '@app/services/auth/session';
import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import MagicLinkService from '@app/services/auth/magic-link';
import { LoginPayload, StorePayload } from './magic-link.schema';

export default class MagicLinkController {
  static async store({ request, response }: HttpContextContract) {
    const { email } = request.payload as StorePayload;
    await MagicLinkService.sendMagicLink(email);

    withSuccess(response, {});
  }

  static async login({ request, response }: HttpContextContract) {
    const { code } = request.payload as LoginPayload;

    const userId = await MagicLinkService.validateMagicLink(code);
    const session = await SessionService.createSession(userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

import { SessionService } from '@app/services/auth/session';
import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import MagicLinkService from '@app/services/auth/magic-link';
import db from '@app/database/connector';
import { LoginPayload, StorePayload } from './magic-link.schema';

export default class MagicLinkController {
  static async store({ request, response }: HttpContextContract) {
    const { email } = request.payload as StorePayload;
    await MagicLinkService.sendMagicLink(db, email);

    withSuccess(response, {});
  }

  static async login({ request, response }: HttpContextContract) {
    const { code } = request.payload as LoginPayload;

    const userId = await MagicLinkService.validateMagicLink(db, code);
    const session = await SessionService.createSession(db, userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

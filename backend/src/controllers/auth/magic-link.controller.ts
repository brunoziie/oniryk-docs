import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import MagicLinkService from '@app:services/auth/magic-link';
import { SessionService } from '@app:services/auth/session';
import { LoginPayload, StorePayload } from '../../validators/auth/magic-link.schema';

export default class MagicLinkController {
  static async store(ctx: HttpContextContract) {
    const { email } = ctx.get('payload') as StorePayload;
    await MagicLinkService.sendMagicLink(email);

    return withSuccess(ctx, {});
  }

  static async login(ctx: HttpContextContract) {
    const { code } = ctx.get('payload') as LoginPayload;

    const userId = await MagicLinkService.validateMagicLink(code);
    const session = await SessionService.createSession(userId);

    return withSuccess(ctx, { user: session.payload, token: session.token });
  }
}

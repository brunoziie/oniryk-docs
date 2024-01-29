import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import GoogleService from '@app:services/auth/google';
import { SessionService } from '@app:services/auth/session';
import { CallbackPayload } from '../../../validators/auth/oauth.schema';

export default class GoogleOAuthController {
  static async authorize(ctx: HttpContextContract) {
    const url = GoogleService.getAuthorizationUrl();
    return withSuccess(ctx, { authorization_url: url });
  }

  static async callback(ctx: HttpContextContract) {
    const { code } = ctx.get('payload') as CallbackPayload;

    const accessToken = await GoogleService.getAccessToken(code as string);
    const profile = await GoogleService.getProfile(accessToken);
    const userId = await GoogleService.createOrUpdateUserByGoogleData(profile);
    const session = await SessionService.createSession(userId);

    return withSuccess(ctx, { user: session.payload, token: session.token });
  }
}

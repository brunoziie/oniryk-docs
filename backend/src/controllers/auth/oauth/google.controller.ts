import GoogleService from '@app:services/auth/google';
import { SessionService } from '@app:services/auth/session';
import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import { CallbackPayload } from '../../../validators/auth/oauth.schema';

export default class GoogleOAuthController {
  static async authorize({ response }: HttpContextContract) {
    const url = GoogleService.getAuthorizationUrl();

    withSuccess(response, { authorization_url: url });
  }

  static async callback({ request, response }: HttpContextContract) {
    const { code } = request.payload as CallbackPayload;

    const accessToken = await GoogleService.getAccessToken(code as string);
    const profile = await GoogleService.getProfile(accessToken);
    const userId = await GoogleService.createOrUpdateUserByGoogleData(profile);
    const session = await SessionService.createSession(userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

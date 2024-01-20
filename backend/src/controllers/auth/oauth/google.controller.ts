import GoogleService from '@/src/services/auth/google';
import { SessionService } from '@/src/services/auth/session';
import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import { CallbackPayload } from '../../../schemas/auth/oauth.schema';

export default class GoogleOAuthController {
  static async authorize({ response }: HttpContextContract) {
    const url = GoogleService.getAuthorizationUrl();

    withSuccess(response, { authorization_url: url });
  }

  static async callback({ request, response }: HttpContextContract) {
    const { code } = request.payload as CallbackPayload;

    if (!code) {
      throw new Error('Missing code');
    }

    const accessToken = await GoogleService.getAccessToken(code as string);
    const profile = await GoogleService.getProfile(accessToken);
    const userId = await GoogleService.createOrUpdateUserByGoogleData(profile);
    const session = await SessionService.createSession(userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

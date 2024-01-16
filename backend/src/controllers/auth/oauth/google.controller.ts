import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import JwtService from '@/src/services/auth/jwt';
import GoogleService from '@/src/services/auth/google';
import { SessionService } from '@/src/services/auth/session';

export default class GoogleOAuthController {
  static async authorize({ response }: HttpContextContract) {
    const url = GoogleService.getAuthorizationUrl();
    response.redirect(url);
  }

  static async callback({ request, response, db }: HttpContextContract) {
    const { code } = request.query;

    if (!code) {
      throw new Error('Missing code');
    }

    const accessToken = await GoogleService.getAccessToken(code as string);
    const profile = await GoogleService.getProfile(accessToken);
    const userId = await GoogleService.createOrUpdateUserByGoogleData(db, profile);
    const session = await SessionService.createSession(db, userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

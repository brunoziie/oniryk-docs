import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import GithubService from '@/src/services/auth/github';
import JwtService from '@/src/services/auth/jwt';
import { SessionService } from '@/src/services/auth/session';

import db from '@app/database/connector';
import { CallbackPayload } from './oauth.schema';

export default class GithubOAuthController {
  static async authorize({ response }: HttpContextContract) {
    const url = GithubService.getAuthorizationUrl();
    withSuccess(response, { authorization_url: url });
  }

  static async callback({ request, response }: HttpContextContract) {
    const { code } = request.payload as CallbackPayload;

    const accessToken = await GithubService.getAccessToken(code as string);
    const profile = await GithubService.getProfile(accessToken);
    const verified = await GithubService.isEmailVerified(accessToken, profile.email);

    if (!verified) {
      throw new Error('GitHub: Email not verified');
    }

    const userId = await GithubService.createOrUpdateUserByGithubData(db, profile);
    const session = await SessionService.createSession(db, userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import GithubService from '@app:services/auth/github';
import { SessionService } from '@app:services/auth/session';

import { CallbackPayload } from '../../../validators/auth/oauth.schema';

export default class GithubOAuthController {
  static async authorize({ response }: HttpContextContract) {
    const url = GithubService.getAuthorizationUrl();
    withSuccess(response, { authorization_url: url });
  }

  static async callback({ request, response }: HttpContextContract) {
    const { code } = request.payload as CallbackPayload;

    const accessToken = await GithubService.getAccessToken(code as string);
    const profile = await GithubService.getProfile(accessToken);
    const userId = await GithubService.createOrUpdateUserByGithubData(profile);
    const session = await SessionService.createSession(userId);

    withSuccess(response, { user: session.payload, token: session.token });
  }
}

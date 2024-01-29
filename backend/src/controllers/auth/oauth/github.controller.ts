import { HttpContextContract } from '@app:contracts/http.contract';
import { withSuccess } from '@app:helpers/http';
import GithubService from '@app:services/auth/github';
import { SessionService } from '@app:services/auth/session';

import { CallbackPayload } from '../../../validators/auth/oauth.schema';

export default class GithubOAuthController {
  static async authorize(ctx: HttpContextContract) {
    const url = GithubService.getAuthorizationUrl();
    return withSuccess(ctx, { authorization_url: url });
  }

  static async callback(ctx: HttpContextContract) {
    const { code } = ctx.get('payload') as CallbackPayload;

    const accessToken = await GithubService.getAccessToken(code as string);
    const profile = await GithubService.getProfile(accessToken);
    const userId = await GithubService.createOrUpdateUserByGithubData(profile);
    const session = await SessionService.createSession(userId);

    return withSuccess(ctx, { user: session.payload, token: session.token });
  }
}

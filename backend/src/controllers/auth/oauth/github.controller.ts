import { HttpContextContract } from '@app/contracts/http.contract';
import { withSuccess } from '@app/helpers/http';
import GithubService from '@/src/services/auth/github';
import JwtService from '@/src/services/auth/jwt';
import { SessionService } from '@/src/services/auth/session';

export default class GithubOAuthController {
  static async authorize({ response }: HttpContextContract) {
    const url = GithubService.getAuthorizationUrl();
    withSuccess(response, { authorization_url: url });
  }

  static async callback({ request, response, db }: HttpContextContract) {
    const { code } = request.inputs!;

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

import env from '@app:env';
import { encrypt } from '@app:helpers/bcrypt';
import { AppError, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '@app:helpers/error';
import { fetchJSON } from '@app:helpers/fetch';
import { shortId } from '@app:helpers/id';
import { UserRepository } from '@db:repositories/user';
import { randomUUID } from 'crypto';
import uniqolor from 'uniqolor';

const GH_BASE = 'https://github.com/login/oauth';
const GH_USER_URL = 'https://api.github.com/user';
const GH_EMAILS_URL = 'https://api.github.com/user/emails';
const GH_SCOPES = ['user:email', 'read:user'];

export type GithubProfile = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
};

export type GitHubEmailStatus = {
  email: string;
  verified: boolean;
};

export type GithubUser = {
  id: number;
  name: string;
  login: string;
  email: string;
  avatar_url: string;
};

export default class GithubService {
  static getAuthorizationUrl() {
    const scopes = GH_SCOPES.join(',');
    return `${GH_BASE}/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=${scopes}`;
  }

  static async getAccessToken(code: string) {
    const req = await fetch(`${GH_BASE}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    if (req.status !== 200) {
      throw AppError('github', 'failed to fetch access token', INTERNAL_SERVER_ERROR);
    }

    const res = await req.json();
    const token = res.access_token;

    if (!token) {
      throw AppError(
        'github',
        (res.error_description || 'failed to fetch access token').toLowerCase(),
        BAD_REQUEST
      );
    }

    return token;
  }

  static async getProfile(accessToken: string, skipEmailVerification = false) {
    try {
      const headers = { Authorization: `token ${accessToken}` };
      const data = await fetchJSON<GithubUser>(GH_USER_URL, { headers });

      if (!skipEmailVerification) {
        const emails = await fetchJSON<GitHubEmailStatus[]>(GH_EMAILS_URL, {
          headers,
        });

        const verifiedEmail = emails.find(
          (e: any) => e.email === data.email && e.verified
        );

        if (!verifiedEmail) {
          throw AppError(
            'github',
            "you can't login with unverified email github accounts",
            BAD_REQUEST
          );
        }
      }

      return {
        id: data.id,
        name: data.name,
        username: data.login,
        email: data.email,
        avatar: data.avatar_url,
      } as GithubProfile;
    } catch (error: any) {
      throw AppError('github', error.message, BAD_REQUEST);
    }
  }

  static async createOrUpdateUserByGithubData(profile: GithubProfile) {
    const githubId = profile.id.toString();
    const email = profile.email;
    const user = await UserRepository.findByEmailOrGithubId(email, githubId);

    // If already linked, return user id
    if (user && user.githubId === githubId) {
      return user.id;
    }

    // Link github account to existing user
    if (user && user.email === email && !user.githubId) {
      await UserRepository.update(user.id, { githubId });
      return user.id;
    }

    // If email is already in use, throw error
    if (user && user.email === email && user.githubId !== githubId) {
      throw AppError('auth', 'email already in use', BAD_REQUEST);
    }

    const id = await UserRepository.create({
      username: shortId(),
      displayName: profile.name,
      email,
      password: await encrypt(randomUUID()),
      githubId,
      avatar: profile.avatar,
      favoriteColor: uniqolor.random().color,
    });

    return id;
  }
}

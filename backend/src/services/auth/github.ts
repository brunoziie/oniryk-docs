import { randomUUID } from 'crypto';
import { nanoid } from 'nanoid';
import uniqolor from 'uniqolor';
import env from '@/env';
import { firstBy, insert, query, update } from '@app/database';
import { encrypt } from '@app/helpers/bcrypt';

const GH_BASE = 'https://github.com/login/oauth';
const GH_SCOPES = ['user:email', 'read:user'];

export type GithubProfile = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
};

export default class GithubService {
  static getAuthorizationUrl() {
    const scopes = GH_SCOPES.join(',');
    return `${GH_BASE}/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=${scopes}`;
  }

  static async getAccessToken(code: string) {
    try {
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

      const res = await req.json();
      return res.access_token;
    } catch (error) {
      throw new Error('GitHub: Failed to fetch access token');
    }
  }

  static async getProfile(accessToken: string) {
    try {
      const req = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });

      const data = await req.json();

      return {
        id: data.id,
        name: data.name,
        username: data.login,
        email: data.email,
        avatar: data.avatar_url,
      } as GithubProfile;
    } catch (error) {
      throw new Error('GitHub: Failed to fetch user profile');
    }
  }

  static async isEmailVerified(token: string, email: string) {
    const data = await fetch('https://api.github.com/user/emails', {
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => res.json());

    return data.find((e: any) => e.email === email && e.verified);
  }

  static async createOrUpdateUserByGithubData(profile: GithubProfile) {
    const githubId = profile.id.toString();
    const user = await this.findUserByGithubIdOrEmail(githubId, profile.email);

    if (user) {
      if (user.github_id !== githubId) {
        user.github_id = githubId;
        await update('users', user.id, { github_id: githubId });
      }

      return user.id as string;
    } else {
      const username = (await this.isUsernameInUse(profile.username))
        ? `user_${nanoid(8)}`
        : profile.username;

      return await insert('users', {
        username,
        display_name: profile.name,
        email: profile.email,
        github_id: githubId,
        password: await encrypt(randomUUID()),
        favorite_color: uniqolor.random().color,
      });
    }
  }

  static async findUserByGithubIdOrEmail(githubId: string, email: string) {
    return await query('users', { github_id: githubId }).orWhere({ email }).first();
  }

  static async isUsernameInUse(username: string) {
    const user = await firstBy('users', { username, deleted_at: null });
    return !!user;
  }
}

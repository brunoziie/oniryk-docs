import { randomUUID } from 'crypto';
import { nanoid } from 'nanoid';
import uniqolor from 'uniqolor';
import env from '@/env';
import { encrypt } from '@app/helpers/bcrypt';
import prisma from '@app/start/database';

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

      if (req.status !== 200) {
        throw new Error('GitHub: Failed to fetch access token');
      }

      const res = await req.json();
      const token = res.access_token;

      if (!token) {
        throw new Error(
          `GitHub: ${res.error_description || 'Failed to fetch access token'}`
        );
      }

      return res.access_token;
    } catch (error: any) {
      if (error.message && error.message.startsWith('GitHub:')) {
        throw error;
      }

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
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ githubId }, { email: profile.email }],
      },
    });

    if (user) {
      if (user.githubId !== githubId) {
        await prisma.user.update({
          where: { id: user.id },
          data: { githubId },
        });
      }

      return user.id as string;
    } else {
      const username = (await this.isUsernameInUse(profile.username))
        ? `user_${nanoid(8)}`
        : profile.username;

      const newUser = await prisma.user.create({
        data: {
          username,
          displayName: profile.name,
          email: profile.email,
          githubId,
          password: await encrypt(randomUUID()),
          favoriteColor: uniqolor.random().color,
        },
      });

      return newUser.id as string;
    }
  }

  static async isUsernameInUse(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });

    return !!user;
  }
}

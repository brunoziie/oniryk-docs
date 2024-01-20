import { randomUUID } from 'crypto';
import { nanoid } from 'nanoid';
import uniqolor from 'uniqolor';
import env from '@/env';
import { encrypt } from '@app/helpers/bcrypt';
import prisma from '@app/start/database';

const GOOGLE_BASE_URL = 'https://accounts.google.com/o/oauth2/v2';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

export type GoogleProfile = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
};

export default class GoogleService {
  static getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      scope: GOOGLE_SCOPES.join(' '),
      response_type: 'code',
      redirect_uri: env.GOOGLE_CALLBACK_URL,
      state: 'state_parameter_passthrough_value',
    });

    return `${GOOGLE_BASE_URL}/auth?${params.toString()}`;
  }

  static async getAccessToken(code: string) {
    try {
      const req = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          code,
          redirect_uri: env.GOOGLE_CALLBACK_URL,
          grant_type: 'authorization_code',
        }).toString(),
      });

      const data = await req.json();
      return data.access_token;
    } catch (error) {
      throw new Error('Google: Failed to fetch access token');
    }
  }

  static async getProfile(accessToken: string) {
    try {
      const req = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return (await req.json()) as GoogleProfile;
    } catch (error) {
      throw new Error('Google: Failed to fetch user profile');
    }
  }

  static async createOrUpdateUserByGoogleData(profile: GoogleProfile) {
    if (!profile.verified_email) {
      throw new Error('Google: Email not verified');
    }

    const { id: googleId, email } = profile;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId }, { email }],
      },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { googleId: profile.id },
      });

      return user.id;
    }

    return (
      await prisma.user.create({
        data: {
          displayName: profile.name,
          username: `user_${nanoid(8)}`,
          email: profile.email,
          googleId: profile.id,
          password: await encrypt(randomUUID()),
          favoriteColor: uniqolor.random().color,
        },
      })
    ).id;
  }
}

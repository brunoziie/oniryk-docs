import env from '@/env';
import { encrypt } from '@/src/helpers/bcrypt';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import uniqolor from 'uniqolor';

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

  static async createOrUpdateUserByGoogleData(db: Knex, profile: GoogleProfile) {
    if (!profile.verified_email) {
      throw new Error('Google: Email not verified');
    }

    const user = await this.findUserByGoogleIdOrEmail(db, profile.id, profile.email);

    if (user) {
      await db('users').where({ id: user.id }).update({ google_id: profile.id });
      return user.id;
    }

    const newUser = {
      id: randomUUID(),
      display_name: profile.name,
      username: `user_${nanoid(8)}`,
      email: profile.email,
      google_id: profile.id,
      password: await encrypt(randomUUID()),
      favorite_color: uniqolor.random().color,
    };

    await db('users').insert(newUser);
    return newUser.id;
  }

  static async findUserByGoogleIdOrEmail(db: Knex, googleId: string, email: string) {
    return await db('users')
      .where({ google_id: googleId })
      .orWhere({ email })
      .whereNull('deleted_at')
      .first();
  }
}

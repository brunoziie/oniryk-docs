import env from '@app:env';
import { encrypt } from '@app:helpers/bcrypt';
import { AppError, BAD_REQUEST } from '@app:helpers/error';
import { fetchJSON } from '@app:helpers/fetch';
import { shortId } from '@app:helpers/id';
import { UserRepository } from '@db:repositories/user';
import { randomUUID } from 'node:crypto';
import uniqolor from 'uniqolor';

const GOOGLE_BASE_URL = 'https://accounts.google.com/o/oauth2/v2';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';

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
      const data = await fetchJSON<{ access_token: string }>(GOOGLE_TOKEN_URL, {
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

      return data.access_token;
    } catch (error) {
      throw AppError('google', 'failed to fetch access token', BAD_REQUEST);
    }
  }

  static async getProfile(accessToken: string, skipEmailVerification = false) {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const profile = await fetchJSON<GoogleProfile>(GOOGLE_USERINFO_URL, { headers });

      if (!skipEmailVerification && !profile.verified_email) {
        throw AppError('google', "you can't login with unverified email google accounts");
      }

      return profile;
    } catch (error) {
      throw AppError('google', 'failed to fetch profile data');
    }
  }

  static async createOrUpdateUserByGoogleData(profile: GoogleProfile) {
    const { id: googleId, email } = profile;
    const user = await UserRepository.findByEmailOrGoogleId(email, googleId);

    // If already linked, return user id
    if (user && user.googleId === googleId) {
      return user.id;
    }

    // Link google account to existing user
    if (user && user.email === email && !user.googleId) {
      await UserRepository.update(user.id, { googleId });
      return user.id;
    }

    // If email is already in use, throw error
    if (user && user.email === email && user.googleId !== googleId) {
      throw AppError('auth', 'email already in use', BAD_REQUEST);
    }

    const id = await UserRepository.create({
      displayName: profile.name,
      username: `user_${shortId()}`,
      email: profile.email,
      googleId: profile.id,
      password: await encrypt(randomUUID()),
      favoriteColor: uniqolor.random().color,
    });

    return id;
  }
}

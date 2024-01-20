import { firstOrFail } from '@app/database';
import JwtService from './jwt';

export class SessionService {
  static async createSession(userId: string) {
    const user = await firstOrFail('users', userId);

    if (!user) {
      throw new Error('User not found');
    }

    const payload = {
      id: user.id,
      name: user.display_name,
      username: user.username,
      favorite_color: user.favorite_color,
    };

    const token = JwtService.sign(payload);

    return {
      payload,
      token,
    };
  }
}

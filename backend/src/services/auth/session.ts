import { Knex } from 'knex';
import JwtService from './jwt';

export class SessionService {
  static async createSession(db: Knex, userId: string) {
    const user = await db('users').where('id', userId).whereNull('deleted_at').first();

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

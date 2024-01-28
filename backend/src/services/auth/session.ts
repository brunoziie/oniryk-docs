import { AppError } from '@app:helpers/error';
import JwtService from './jwt';
import { UserRepository } from '@db:repositories/user';

export class SessionService {
  static async createSession(userId: string) {
    const user = await UserRepository.find(userId);

    if (!user) {
      throw AppError('session', 'user not found', 400);
    }

    const payload = {
      id: user.id,
      name: user.displayName,
      username: user.username,
      favorite_color: user.favoriteColor,
    };

    const token = JwtService.sign(payload);

    return {
      payload,
      token,
    };
  }
}

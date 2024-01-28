import { AppError, BAD_REQUEST } from '@app:helpers/error';
import { UserRepository } from '@db:repositories/user';
import { User } from '@db:schemas';
import { Updatable } from '@db:utils';

export default class AccountService {
  static async getUserAccount(userId: string) {
    return await UserRepository.find(userId);
  }

  static async updateUserAccount(userId: string, data: Updatable<User>) {
    if (data.email) {
      const inUse = await UserRepository.emailExists(data.email, userId);

      if (inUse) {
        throw AppError('account', 'email already in use', BAD_REQUEST);
      }
    }

    return await UserRepository.update(userId, data);
  }
}

import { first, query, update } from '@app/database';
import { encrypt } from '@/src/helpers/bcrypt';

export type UpdatebleUserFields = {
  display_name: string;
  email: string;
  password: string;
  username: string;
  favorite_color: string;
  avatar: string;
};

export default class AccountService {
  static async getUserAccount(userId: string) {
    return first('users', userId);
  }

  static async updateUserAccount(userId: string, data: Partial<UpdatebleUserFields>) {
    const toUpdate = {} as Partial<UpdatebleUserFields>;

    if (data.display_name) {
      toUpdate.display_name = data.display_name;
    }

    if (data.email) {
      if (!(await this.canChangeEmail(userId, data.email))) {
        toUpdate.email = data.email;
      } else {
        throw new Error('Email already in use');
      }
    }

    if (data.password) {
      toUpdate.password = await encrypt(data.password);
    }

    if (data.username) {
      toUpdate.username = data.username;
    }

    if (data.favorite_color) {
      toUpdate.favorite_color = data.favorite_color;
    }

    if (data.avatar) {
      toUpdate.avatar = data.avatar;
    }

    return update('users', userId, toUpdate);
  }

  static async canChangeEmail(userId: string, email: string) {
    return !!(await query('users', { email }).whereNot('id', userId).first());
  }
}

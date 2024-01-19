import { encrypt } from '@/src/helpers/bcrypt';
import { Knex } from 'knex';

export type UpdatebleUserFields = {
  display_name: string;
  email: string;
  password: string;
  username: string;
  favorite_color: string;
  avatar: string;
};

export default class AccountService {
  static async getUserAccount(db: Knex, userId: string) {
    return db.from('users').where({ id: userId, deleted_at: null }).first();
  }

  static async updateUserAccount(
    db: Knex,
    userId: string,
    data: Partial<UpdatebleUserFields>
  ) {
    const toUpdate = {} as Partial<UpdatebleUserFields>;

    if (data.display_name) {
      toUpdate.display_name = data.display_name;
    }

    if (data.email) {
      if (!(await this.canChangeEmail(db, userId, data.email))) {
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

    return db.from('users').where({ id: userId, deleted_at: null }).update(data);
  }

  static async canChangeEmail(db: Knex, userId: string, email: string) {
    return !!(await db.from('users').where({ email }).whereNot('id', userId).first());
  }
}

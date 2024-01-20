import { PrismaClient } from '@prisma/client';
import { encrypt } from '@app/helpers/bcrypt';

const prisma = new PrismaClient();

export type UpdatebleUserFields = {
  displayName: string;
  email: string;
  password: string;
  username: string;
  favoriteColor: string;
  avatar: string;
};

export default class AccountService {
  static async getUserAccount(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
        deletedAt: null,
      },
    });
  }

  static async updateUserAccount(userId: string, data: Partial<UpdatebleUserFields>) {
    const toUpdate = {} as Partial<UpdatebleUserFields>;

    if (data.displayName) {
      toUpdate.displayName = data.displayName;
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

    if (data.favoriteColor) {
      toUpdate.favoriteColor = data.favoriteColor;
    }

    if (data.avatar) {
      toUpdate.avatar = data.avatar;
    }

    return prisma.user.update({
      where: {
        id: userId,
        deletedAt: null,
      },
      data: toUpdate,
    });
  }

  static async canChangeEmail(userId: string, email: string) {
    return !!(await prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
        NOT: {
          id: userId,
        },
      },
    }));
  }
}

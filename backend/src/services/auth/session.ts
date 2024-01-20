import { PrismaClient } from '@prisma/client';
import JwtService from './jwt';

const prisma = new PrismaClient();

export class SessionService {
  static async createSession(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new Error('User not found');
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

import { encrypt } from '@/src/helpers/bcrypt';
import prisma from '@app/start/database';
import uniqolor from 'uniqolor';

(async function main() {
  await prisma.user.create({
    data: {
      username: 'teo',
      displayName: 'Teo',
      email: 'teo@oniryk.dev',
      password: await encrypt('secret'),
      favoriteColor: uniqolor.random().color,
    },
  });

  await prisma.$disconnect();
})();

import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

const extendedClient = prisma.$extends(
  createSoftDeleteExtension({
    models: {
      Team: true,
      Project: true,
      Ownership: true,
      User: true,
      Document: true,
    },
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date();
        return null;
      },
    },
  })
);

export default extendedClient;

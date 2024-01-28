import { mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { users } from './users';
import { uuid, timestamps, ref } from '@db:utils';

export const passwordRecoveries = mysqlTable('password_recoveries', {
  id: uuid.primary(),
  userId: ref('user_id', users.id).notNull(),
  code: uuid('code').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
  ...timestamps(),
});

export type PasswordRecovery = typeof passwordRecoveries.$inferSelect;
export type PasswordRecoveryInsert = typeof passwordRecoveries.$inferInsert;

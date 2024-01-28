import { mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { ref, timestamps, uuid } from '../utils';
import { users } from './users';

export const magicLinks = mysqlTable('magic_links', {
  id: uuid.primary(),
  userId: ref('user_id', users.id).notNull(),
  code: uuid('code').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
  ...timestamps(),
});

export type MagicLink = typeof magicLinks.$inferSelect;
export type MagicLinkInsert = typeof magicLinks.$inferInsert;

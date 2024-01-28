import { timestamps, uuid } from '@db:utils';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: uuid.primary(),
  username: varchar('username', { length: 255 }).notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 255 }).default('NULL'),
  favoriteColor: varchar('favorite_color', { length: 7 }).default('NULL'),
  githubId: varchar('github_id', { length: 255 }).default('NULL'),
  googleId: varchar('google_id', { length: 255 }).default('NULL'),
  ...timestamps(),
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

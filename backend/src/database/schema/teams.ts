import { timestamps, uuid } from '@db:utils';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const teams = mysqlTable('teams', {
  id: uuid.primary(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps(),
});

export type Team = typeof teams.$inferSelect;
export type TeamInsert = typeof teams.$inferInsert;

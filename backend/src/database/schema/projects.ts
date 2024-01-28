import { timestamps, uuid } from '@db:utils';
import { mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';

export const projects = mysqlTable('projects', {
  id: uuid.primary(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').default('NULL'),
  ...timestamps(),
});

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

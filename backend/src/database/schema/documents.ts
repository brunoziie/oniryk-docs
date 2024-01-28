import { longtext, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { longblob, timestamps, uuid } from '../utils';

export const documents = mysqlTable('documents', {
  id: uuid.primary(),
  title: varchar('title', { length: 255 }).notNull(),
  content: longtext('content').default('NULL'),
  binaryContent: longblob('binary_content'),
  searchableContent: longtext('searchable_content').default('NULL'),
  ...timestamps(),
});

export type Document = typeof documents.$inferSelect;
export type DocumentInsert = typeof documents.$inferInsert;

import { documents } from '@db:schemas';
import { MySqlColumn, MySqlTableWithColumns } from 'drizzle-orm/mysql-core';

export type FullTextIndex = {
  // @ts-ignore
  table: MySqlTableWithColumns<any>;
  columns: MySqlColumn[];
};

const indexes: FullTextIndex[] = [
  {
    table: documents,
    columns: [documents.title, documents.searchableContent],
  },
];

export default indexes;

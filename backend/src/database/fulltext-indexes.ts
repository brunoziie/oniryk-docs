import { documents, projects, teams } from '@db:schemas';
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
  {
    table: teams,
    columns: [teams.name],
  },
  {
    table: projects,
    columns: [projects.title, projects.description],
  },
];

export default indexes;

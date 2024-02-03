import env from '@app:env';
import indexes from '@db:fulltext-indexes';
import { getTableName, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2';

async function main() {
  const connection = createConnection(env.DATABASE_URL);

  try {
    const db = drizzle(connection);

    for (const index of indexes) {
      const { table, columns } = index;
      const tableName = getTableName(table);
      const columnNames = columns.map((column) => column.name);
      const name = ['fts', tableName, ...columnNames].join('_').toLocaleLowerCase();

      await db.execute(
        sql`CREATE FULLTEXT INDEX IF NOT EXISTS ${sql.raw(name)} ON ${sql.raw(tableName)}(${sql.raw(columnNames.join(', '))})`
      );
    }

    console.log('Fulltext indexes created');

    connection.end();
  } catch (error) {
    connection.end();
    throw error;
  }
}

main();

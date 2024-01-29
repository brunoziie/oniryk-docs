import env from '@app:env';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export const connection = mysql.createPool(env.DATABASE_URL);
export const db = drizzle(connection, {
  logger: env.NODE_ENV !== 'production' && env.DEBUG_DB,
});

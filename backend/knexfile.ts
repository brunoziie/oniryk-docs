import type { Knex } from 'knex';
import env from './env';
import path from 'path';

const base: Knex.Config = {
  client: 'mysql2',
  migrations: {
    tableName: 'knex',
    directory: path.resolve(__dirname, 'src/database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src/database/seeds'),
  },
  pool: {
    min: 2,
    max: 10,
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    ...base,
    connection: env.DATABASE_URL,
    debug: env.DEBUG,
  },

  production: {
    ...base,
    connection: env.DATABASE_URL,
  },
};

module.exports = config;

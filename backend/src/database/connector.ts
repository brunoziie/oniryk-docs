import env from '@/env';
import * as configs from '@/knexfile';
import knex from 'knex';

const db = knex((configs as any)[env.NODE_ENV || 'development']);

export default db;

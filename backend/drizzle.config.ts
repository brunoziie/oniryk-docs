import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { ConnectionStringParser } from 'connection-string-parser';

const configs = new ConnectionStringParser({ scheme: 'mysql', hosts: [] }).parse(
  process.env.DATABASE_URL!
);

export default {
  schema: './src/database/schema/*',
  out: './src/database/migrations',
  driver: 'mysql2',

  dbCredentials: {
    host: configs.hosts[0].host,
    port: configs.hosts[0].port,
    user: configs.username,
    password: configs.password,
    database: configs.endpoint!,
  },
} satisfies Config;

import zod from 'zod';
import dotenv from 'dotenv';
import parser from 'dotenv-parse-variables';
import path = require('path');

const original = dotenv.config({ path: path.resolve(__dirname, '.env') });

const schema = zod.object({
  PORT: zod.number().default(3000),
  NODE_ENV: zod.enum(['development', 'production']).default('development'),
  APP_SECRET: zod.string(),
  DATABASE_URL: zod.string().url(),
  JWT_LIFETIME: zod.string().default('30 days'), // in minutes (30 days)
  DEBUG: zod.boolean().default(false), // will be ignored if NODE_ENV is not 'development'
});

const env = schema.parse(parser(original.parsed || {}));

export default env;

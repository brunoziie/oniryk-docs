import zod from 'zod';
import dotenv from 'dotenv';
import parser from 'dotenv-parse-variables';
import { expand } from 'dotenv-expand';

const original = expand(dotenv.config());

const schema = zod.object({
  NODE_ENV: zod.enum(['development', 'production']).default('development'),
  BASE_URL: zod.string().url(),
  PORT: zod.number().default(3000),
  DEBUG: zod.boolean().default(false), // will be ignored if NODE_ENV is not 'development'
  FRONTEND_URL: zod.string().url(),

  // Session / Crypto
  APP_SECRET: zod.string(),
  JWT_LIFETIME: zod.string().default('30 days'), // any valid format to vercel/ms (github.com/vercel/ms)

  // Database
  DATABASE_URL: zod.string().url(),

  // Mailer
  MAILER_SMTP_URL: zod.string().url(),
  MAILER_FROM: zod.string(),

  // OAuth
  GITHUB_CLIENT_ID: zod.string(),
  GITHUB_CLIENT_SECRET: zod.string(),
  GITHUB_CALLBACK_URL: zod.string().url(),

  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
  GOOGLE_CALLBACK_URL: zod.string().url(),
});

const env = schema.parse(parser(original.parsed || {}));

export default env;

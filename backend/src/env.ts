import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import zod from 'zod';

const original = expand(dotenv.config());
const boolean = () => zod.enum(['true', 'false']).transform((value) => value === 'true');

const schema = zod.object({
  NODE_ENV: zod.enum(['development', 'production', 'test']).default('development'),
  BASE_URL: zod.string().url(),
  PORT: zod.coerce.number().optional().default(3000),
  FRONTEND_URL: zod.string().url(),

  // Profiling
  DEBUG_DB: boolean(),
  DEBUG_LOGGING: boolean(),
  DEBUG_MAILDEV: boolean(),

  // Session / Crypto
  APP_SECRET: zod.string(),
  JWT_LIFETIME: zod.string().default('30 days'), // any valid format to vercel/ms (github.com/vercel/ms)

  // Database
  DATABASE_URL: zod.string().url(),

  // Mailer
  MAILER_SMTP_URL: zod.string().url(),
  MAILER_FROM: zod.string(),
  MAILER_USE_MAILDEV: zod.boolean().default(false),

  // OAuth
  GITHUB_CLIENT_ID: zod.string(),
  GITHUB_CLIENT_SECRET: zod.string(),
  GITHUB_CALLBACK_URL: zod.string().url(),

  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
  GOOGLE_CALLBACK_URL: zod.string().url(),
});

const env = schema.parse(original.parsed || {});

export const runWhen = (
  nodeEnv: 'development' | 'production' | 'test',
  fn: () => unknown
) => {
  if (nodeEnv === env.NODE_ENV) {
    fn();
  }
};

export default env;

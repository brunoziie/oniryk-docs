import env, { runWhen } from '@app:env';
import { AppError } from '@app:helpers/error';
import { withError } from '@app:helpers/http';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

import auth from './middlewares/auth';
import payload from './middlewares/payload';
import routes from './routes';

const globalMiddlewares = [auth, payload];

const hono = (setup?: (app: Hono) => void) => {
  const app = new Hono();

  app.use('*', secureHeaders());

  runWhen('production', () => {
    app.use('*', compress());
  });

  runWhen('development', () => {
    if (env.DEBUG_LOGGING) {
      app.use('*', logger());
    }
  });

  for (const middleware of globalMiddlewares) {
    app.use('*', middleware);
  }

  for (const route of routes) {
    route(app);
  }

  setup && setup(app);

  app.notFound((c) => {
    const path = c.req.path;
    const method = c.req.method;
    const error = AppError('router', `route '${method} ${path}' not found`, 404);

    return withError(c, error);
  });

  app.onError((err, c) => {
    return withError(c, err);
  });

  const server = serve({
    fetch: app.fetch,
    port: env.PORT,
  });

  server.on('listening', () => {
    const lines = [
      `\n\n🚀 Oniryk Docs :: Running @ http://0.0.0.0:${env.PORT}\n`,
      `🛠️  NODE_ENV: ${process.env.NODE_ENV}`,
      `   DEBUG_DB: ${process.env.DEBUG_DB}`,
      `   DEBUG_LOGGING: ${process.env.DEBUG_LOGGING}`,
      `   DEBUG_MAILDEV: ${process.env.DEBUG_MAILDEV}`,
      `\n`,
    ];

    console.log(lines.join('\n'));
  });

  return { app, server };
};

export default hono;

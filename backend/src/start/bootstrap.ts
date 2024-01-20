import express, { Request, Response } from 'express';
import { HttpServerInitializer } from '@app/contracts/http.contract';
import { withError } from '@app/helpers/http';
import routes from '@app/start/routes';
import env from '@/env';
import hocuspocus from '@app/start/hocuspocus';
import PayloadMiddleware from '@app/start/middlewares/payload';
import prisma from './database';

const http: HttpServerInitializer = ({ setup }) => {
  const app = express();

  app.use(express.json());

  setup && setup(app);

  app.get('*', (req: Request, res: Response) => {
    withError(res, new Error(`Route ${req.originalUrl} not found`), 404);
  });

  app.use((err: Error, req: Request, res: Response) => {
    withError(res, err);
  });

  app.listen(env.PORT, () => {
    console.log(`running @ 0.0.0.0:${env.PORT} 🚀`);
  });

  return app;
};

export default async function start() {
  const app = http({
    setup: (app) => {
      app.use((request, response, next) => {
        return PayloadMiddleware({ request, response, next });
      });

      // Setup routes
      routes.forEach((route) => route({ app }));

      // Setup Hocuspocus server
      hocuspocus({ app });
    },
  });

  return app;
}

process.on('uncaughtException', (err) => {
  console.error(
    `[UncaughtException :: Shutting down server] -> {\n\n${err.stack
      ?.split('\n')
      .map((line) => `   ${line.replace(/^\s+/, '  ')}`)
      .join('\n')}\n\n}`
  );
  prisma.$disconnect();
  process.exit(1);
});

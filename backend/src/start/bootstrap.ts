import express, { Request, Response } from 'express';
import { HttpServerInitializer } from '@app/contracts/http.contract';
import { withError } from '@app/helpers/http';
import db from '@app/database/connector';
import routes from '@app/start/routes';
import env from '@/env';
import hocuspocus from '@app/start/hocuspocus';

const http: HttpServerInitializer = ({ setup }) => {
  const app = express();

  app.use(express.json());

  if (setup) {
    setup(app);
  }

  app.get('*', (req: Request, res: Response) => {
    withError(res, new Error(`Route ${req.originalUrl} not found`), 404);
  });

  app.use((err: Error, req: Request, res: Response) => {
    withError(res, err);
  });

  app.listen(env.PORT, () => {
    console.log(`Server is listening on port ${env.PORT}`);
  });

  return app;
};

export default async function start() {
  const app = http({
    setup: (app) => {
      // Setup routes
      routes.forEach((route) => route({ app, db }));

      // Setup Hocuspocus server
      hocuspocus({ app, db });
    },
  });

  return app;
}

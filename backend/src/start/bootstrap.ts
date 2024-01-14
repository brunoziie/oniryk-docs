import express, { Request, Response } from 'express';
import { HttpServerInitializer } from '@app/contracts/http.contract';
import { withError } from '@app/helpers/http';
import db from '@app/database/connector';
import routes from './routes';
import env from '@/env';

const http: HttpServerInitializer = ({ setup }) => {
  const app = express();

  app.use(express.json());

  if (setup) {
    setup(app);
  }

  app.use((err: Error, req: Request, res: Response) => {
    withError(res, err);
  });

  app.get('*', (req: Request, res: Response) => {
    withError(res, new Error(`Route ${req.originalUrl} not found`), 404);
  });

  app.listen(env.PORT, () => {
    console.log(`Server is listening on port ${env.PORT}`);
  });

  return app;
};

export default async function start() {
  const app = http({
    setup: (app) => {
      console.log('Setting up routes...');
      routes.forEach((route) => route({ app, db }));
    },
  });

  return app;
}

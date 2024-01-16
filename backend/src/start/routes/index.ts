import AppController from '@/src/controllers/app.controller';
// import AuthMiddleware from '../middlewares/auth';
import { route } from '../router';

import auth from './auth';
import Zod from 'zod';
import ValidatorMiddleware from '../middlewares/validator';

const routes = [
  route('get', '/', AppController.healthcheck),
  ...auth,
  route(
    'get',
    '/test',
    ({ response }) => {
      response.send('Hello World!');
    },
    [
      ValidatorMiddleware(
        Zod.object({
          name: Zod.string().min(3).url(),
          email: Zod.string().email(),
          foo: Zod.object({ bar: Zod.string() }),
        })
      ),
    ]
  ),
];

export default routes;

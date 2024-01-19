import { group } from '@app/start/router';
import AccountController from '@app/controllers/account.controller';
import { validate } from '@app/start/middlewares/validator';
import { updateAccount } from '@/src/controllers/account.schema';
import AuthMiddleware from '@app/start/middlewares/auth';

export default [
  group(
    (route) => {
      route('get', '/me', AccountController.show);
      route('put', '/me', AccountController.update, [validate(updateAccount)]);
    },
    {
      prefix: '/account',
      middlewares: [AuthMiddleware],
    }
  ),
];

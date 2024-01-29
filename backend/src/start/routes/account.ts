import AccountController from '@app:controllers/account.controller';
import { validate } from '@app:start/middlewares/validator';
import { group } from '@app:start/router';
import { updateAccount } from '@app:validators/auth/account.schema';

export default [
  group('/account', ({ route }) => {
    route('get', '/me', AccountController.show);
    route('put', '/me', AccountController.update, [validate(updateAccount)]);
  }),
];

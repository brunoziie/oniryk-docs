import { group } from '@app:start/router';

// Controllers
import MagicLinkController from '@app:controllers/auth/magic-link.controller';
import GoogleOAuthController from '@app:controllers/auth/oauth/google.controller';
import GithubOAuthController from '@app:controllers/auth/oauth/github.controller';
import PasswordController from '@app:controllers/auth/password.controller';
import { validate } from '@app:start/middlewares/validator';

// Validation schemas
import { login, store } from '@app:validators/auth/magic-link.schema';
import { callback } from '@app:validators/auth/oauth.schema';
import {
  login as loginPassword,
  forgotPassword,
  resetPassword,
} from '@app:validators/auth/password.schema';

export default [
  group(
    (route) => {
      // Github OAuth
      route('get', '/oauth/github/authorize', GithubOAuthController.authorize);
      route('get', '/oauth/github/callback', GithubOAuthController.callback, [
        validate(callback),
      ]);

      // Google OAuth
      route('get', '/oauth/google/authorize', GoogleOAuthController.authorize);
      route('get', '/oauth/google/callback', GoogleOAuthController.callback, [
        validate(callback),
      ]);

      // Magic Link
      route('post', '/magic-link', MagicLinkController.store, [validate(store)]);
      route('post', '/magic-link/login', MagicLinkController.login, [validate(login)]);

      // Password
      route('post', '/password/login', PasswordController.login, [
        validate(loginPassword),
      ]);
      route('post', '/password/forgot', PasswordController.forgot, [
        validate(forgotPassword),
      ]);
      route('post', '/password/reset', PasswordController.reset, [
        validate(resetPassword),
      ]);
    },
    {
      prefix: '/auth',
    }
  ),
];

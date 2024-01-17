import { route } from '@app/start/router';

// Controllers
import MagicLinkController from '@app/controllers/auth/magic-link.controller';
import GoogleOAuthController from '@app/controllers/auth/oauth/google.controller';
import GithubOAuthController from '@app/controllers/auth/oauth/github.controller';
import PasswordController from '@/src/controllers/auth/password.controller';
import ValidatorMiddleware from '@app/start/middlewares/validator';

// Validation schemas
import { login, store } from '@app/controllers/auth/magic-link.schemas';
import { callback } from '@app/controllers/auth/oauth/oauth.schemas';
import {
  login as loginPassword,
  forgotPassword,
  resetPassword,
} from '@/src/controllers/auth/password.schemas';

export default [
  // Github OAuth
  route('get', '/auth/oauth/github/authorize', GithubOAuthController.authorize),
  route('get', '/auth/oauth/github/callback', GithubOAuthController.callback, [
    ValidatorMiddleware(callback),
  ]),

  // Google OAuth
  route('get', '/auth/oauth/google/authorize', GoogleOAuthController.authorize),
  route('get', '/auth/oauth/google/callback', GoogleOAuthController.callback, [
    ValidatorMiddleware(callback),
  ]),

  // Magic Link
  route('post', '/auth/magic-link', MagicLinkController.store, [
    ValidatorMiddleware(store),
  ]),
  route('post', '/auth/magic-link/login', MagicLinkController.login, [
    ValidatorMiddleware(login),
  ]),

  // Password
  route('post', '/auth/password/login', PasswordController.login, [
    ValidatorMiddleware(loginPassword),
  ]),
  route('post', '/auth/password/forgot', PasswordController.forgot, [
    ValidatorMiddleware(forgotPassword),
  ]),
  route('post', '/auth/password/reset', PasswordController.reset, [
    ValidatorMiddleware(resetPassword),
  ]),
];

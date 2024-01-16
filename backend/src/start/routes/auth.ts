import GoogleOAuthController from '@/src/controllers/auth/oauth/google.controller';
import GithubOAuthController from '@app/controllers/auth/oauth/github.controller';
import { route } from '@app/start/router';

export default [
  // Github OAuth
  route('get', '/auth/oauth/github/authorize', GithubOAuthController.authorize),
  route('get', '/auth/oauth/github/callback', GithubOAuthController.callback),
  // Google OAuth
  route('get', '/auth/oauth/google/authorize', GoogleOAuthController.authorize),
  route('get', '/auth/oauth/google/callback', GoogleOAuthController.callback),
];

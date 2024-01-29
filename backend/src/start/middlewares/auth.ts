import { AuthUser } from '@app:contracts/auth.contract';
import { MiddlewareFn } from '@app:contracts/http.contract';
import { AppError, UNAUTHORIZED } from '@app:helpers/error';
import JwtService from '@app:services/auth/jwt';

const auth: MiddlewareFn = async (ctx, next) => {
  const path = ctx.req.path;

  if (path === '/favicon.ico' || path === '/robots.txt' || path.startsWith('/auth')) {
    return next();
  }

  const headers = ctx.req.raw.headers;
  const authorization = headers.get('authorization') || '';

  if (!authorization) {
    throw AppError('auth', 'no token provided', UNAUTHORIZED);
  }

  if (!authorization.match(/Bearer\s.*/)) {
    throw AppError('auth', 'invalid authorization token format', UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const user = await JwtService.verify<AuthUser>(token);
    ctx.set('user', user);
  } catch (err) {
    throw AppError('auth', 'invalid authorization token format', UNAUTHORIZED);
  }

  return next();
};

export default auth;

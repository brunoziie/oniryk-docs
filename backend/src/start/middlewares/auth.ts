import { AuthUser } from '@/src/contracts/auth.contract';
import JwtService from '@/src/services/auth/jwt';
import { MiddlewareContext } from '@app/contracts/http.contract';
import { withError } from '@app/helpers/http';

export default async function AuthMiddleware(context: MiddlewareContext) {
  const { request, response, next } = context;
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return withError(response, new Error('Auth: No token provided'), 401);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return withError(response, new Error('Auth: Token error'), 401);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return withError(response, new Error('Auth: Token malformatted'), 401);
  }

  try {
    request.user = await JwtService.verify<AuthUser>(token);
    next();
  } catch (err) {
    return withError(response, new Error('Auth: Token invalid'), 401);
  }
}

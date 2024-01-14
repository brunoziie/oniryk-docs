import { withError } from '@app/helpers/http';
import env from '@/env';
import { MiddlewareContext } from '@app/contracts/http.contract';
import jwt from 'jsonwebtoken';

export default function AuthMiddleware(context: MiddlewareContext) {
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

  jwt.verify(token, env.APP_SECRET || '', (err, decoded) => {
    if (err) {
      return withError(response, new Error('Auth: Invalid token'), 401);
    }

    return next();
  });
}

import { HttpContextContract } from '@app:contracts/http.contract';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { PaginationContract } from '../contracts/pagination.contract';
import { isAppError, parseAppError, parseErrorStack } from './error';
import { snakeifyObjectKeys } from './inflection';

export function withSuccess(
  ctx: HttpContextContract,
  data: unknown = null,
  statusCode: number = 200
) {
  const ownership = ctx.get('ownership');

  const payload = snakeifyObjectKeys({
    status: 'OK',
    data,
    error: null,
    ...(ownership ? { ownership } : {}),
  });

  return ctx.json(payload, statusCode);
}

export function withError(
  ctx: HttpContextContract,
  err: Error,
  statusCode: number = 500
) {
  let error = {};
  let status = statusCode;

  if (isAppError(err)) {
    const appErr = parseAppError(err);
    status = appErr.status;

    error = {
      message: appErr.message,
      stack: parseErrorStack(err),
    };
  } else if (err instanceof ZodError) {
    const issueSeparator = '/^:$/';
    const zodErr = fromZodError(err, { prefix: null, issueSeparator });

    error = {
      message: '[shield] validation failed',
      issues: zodErr.message.toLowerCase().replace(/\"/g, "'").split(issueSeparator),
    };

    status = 400;
  } else {
    error = {
      message: err.message,
      ...(process.env.NODE_ENV === 'development'
        ? { stack: err.stack?.split(/\n/) }
        : {}),
    };
  }

  return ctx.json({ status: 'ERROR', error }, status);
}

export function withPagination(
  ctx: HttpContextContract,
  data: PaginationContract<unknown>
) {
  const ownership = ctx.get('ownership');

  const payload = snakeifyObjectKeys({
    status: 'OK',
    data: data.rows,
    pagination: {
      total: data.total,
      page: data.page,
      perPage: data.perPage,
    },
    error: null,
    ...(ownership ? { ownership } : {}),
  });

  return ctx.json(payload, 200);
}

import type { Response } from 'express';
import { snakeifyObjectKeys } from './inflection';
import { PaginationContract } from '../contracts/pagination.contract';

export function withSuccess(
  response: Response,
  data: any = null,
  statusCode: number = 200
) {
  const payload = snakeifyObjectKeys({
    status: 'OK',
    data,
    error: null,
  });

  response.status(statusCode).json(payload);
}


export function withError(response: Response, error: any, statusCode: number = 500) {
  response.status(statusCode).json({
    status: 'ERROR',
    data: null,
    error: {
      message: error.message,
      ...(process.env.NODE_ENV === 'development'
        ? { stack: error.stack.split(/\n/) }
        : {}),
    },
  });
}

export function withValidationError(
  response: Response,
  error: any,
  statusCode: number = 400
) {
  response.status(statusCode).json({
    status: 'ERROR',
    data: null,
    error: {
      message: 'Validation failed',
      issues: (error.issues || []).map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message,
        rule: [issue.type, issue.code].filter(Boolean).join('.'),
      })),
    },
  });
}

export function withPagination(response: Response, data: PaginationContract<unknown>) {
  const payload = snakeifyObjectKeys({
    status: 'OK',
    data: data.rows,
    pagination: {
      total: data.total,
      page: data.page,
      perPage: data.perPage,
    },
    error: null,
  });

  response.status(200).json(payload);
}

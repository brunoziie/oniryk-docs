import type { Response } from 'express';

export function withSuccess(response: Response, data: any, statusCode: number = 200) {
  response.status(statusCode).json({
    status: 'OK',
    data,
    error: null,
  });
}

export function withError(response: Response, error: any, statusCode: number = 500) {
  response.status(statusCode).json({
    status: 'ERROR',
    data: null,
    error: {
      message: error.message,
      ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
    },
  });
}

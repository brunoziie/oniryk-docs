import env from '@app:env';

export function AppError(tag: string, message: string, status: number = 500) {
  return new Error(`[${tag}:${status}] ${message}`);
}

export function isAppError(error: Error) {
  return /\[\w+:\d+\]\s\w+/.test(error.message);
}

export function parseAppError(error: Error) {
  const [_, tag, status, message] = error.message.match(/\[(\w+):(\d+)\]\s(.*)/)!;

  return {
    message: `[${tag}]: ${message}`,
    status: Number(status),
  };
}

export function parseErrorStack(error: Error) {
  if (env.NODE_ENV === 'production') return undefined;
  return error.stack
    ?.split(/\n/)
    .slice(2)
    .map((line) => line.trim());
}

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;

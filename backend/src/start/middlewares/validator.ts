import { MiddlewareFn } from '@app:contracts/http.contract';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (async (ctx, next) => {
    const payload = ctx.get('payload');
    const parsed = schema.parse(payload);

    ctx.set('payload', parsed);

    await next();
  }) as MiddlewareFn;
};

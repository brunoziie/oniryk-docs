import { HttpContextContract, NextFn } from '@app:contracts/http.contract';
import Zod from 'zod';

const filterSchema = Zod.object({
  q: Zod.string().optional().nullable().default(null),
  page: Zod.coerce.number().optional().default(1),
  limit: Zod.coerce.number().max(50).optional().default(10),
});

export default async function payload(ctx: HttpContextContract, next: NextFn) {
  const request = ctx.req.raw;
  const method = ctx.req.method;
  const queries = ctx.req.query();

  let payload: any = {
    ...queries,
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    if (request.body) {
      payload = {
        ...payload,
        ...(await request.json()),
      };
    }
  }

  ctx.set('payload', payload);
  const filters = filterSchema.parse(queries);
  ctx.set('filters', filters);
  await next();
}

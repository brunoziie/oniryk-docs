import { camelizeObjectKeys } from '@/src/helpers/inflection';
import { defaultFilters } from '@/src/schemas/filters';
import { MiddlewareContext } from '@app/contracts/http.contract';

export default function PayloadMiddleware(context: MiddlewareContext) {
  context.request.payload = camelizeObjectKeys({
    ...(context.request.query || {}),
    ...(context.request.body || {}),
  });

  context.request.filters = defaultFilters.parse(context.request.query);
  context.next();
}

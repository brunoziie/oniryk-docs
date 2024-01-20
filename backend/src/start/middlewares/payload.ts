import { camelizeObjectKeys } from '@/src/helpers/inflection';
import { MiddlewareContext } from '@app/contracts/http.contract';

export default function PayloadMiddleware(context: MiddlewareContext) {
  context.request.payload = camelizeObjectKeys({
    ...(context.request.query || {}),
    ...(context.request.body || {}),
  });

  context.next();
}

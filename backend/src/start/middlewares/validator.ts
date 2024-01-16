import { Schema, ZodError } from 'zod';
import { MiddlewareContext } from '@app/contracts/http.contract';
import { withError, withValidationError } from '@app/helpers/http';

export default function ValidatorMiddleware(schema: Schema) {
  return async function (context: MiddlewareContext) {
    const inputs = {
      ...(context.request.body || {}),
      ...(context.request.query || {}),
    };

    try {
      context.request.body = schema.parse(inputs);
      return context.next();
    } catch (err) {
      return withValidationError(context.response, err, 400);
    }
  };
}

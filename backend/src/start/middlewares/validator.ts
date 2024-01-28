import { MiddlewareContext } from '@app:contracts/http.contract';
import { withValidationError } from '@app:helpers/http';
import { Schema, ZodError } from 'zod';

function ValidatorMiddleware(schema: Schema) {
  return async function (context: MiddlewareContext) {
    try {
      context.request.payload = schema.parse(context.request.payload);
      return context.next();
    } catch (err: unknown) {
      return withValidationError(context.response, err as ZodError, 400);
    }
  };
}

export default ValidatorMiddleware;

export function validate(schema: Schema) {
  return ValidatorMiddleware(schema);
}

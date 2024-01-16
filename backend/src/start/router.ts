import {
  RouteAction,
  RouteHandler,
  RouteInjector,
  RouteMethod,
  RouteMiddleware,
  RouteMiddlewareContract,
} from '@app/contracts/http.contract';
import { withError } from '../helpers/http';

export function route(
  method: RouteMethod,
  path: string,
  action: RouteHandler,
  middlewares?: RouteMiddlewareContract[]
) {
  return ({ app, db }: RouteInjector) => {
    const handler: RouteAction = async (request, response) => {
      try {
        return await action({ request, response, db });
      } catch (error) {
        withError(response, error);
      }
    };

    const middlewareChain = (middlewares || []).map((cur) => {
      const middleware: RouteMiddleware = (request, response, next) => {
        return cur({ response, request, next, db });
      };

      return middleware;
    });

    app[method](path, ...middlewareChain, handler);
  };
}

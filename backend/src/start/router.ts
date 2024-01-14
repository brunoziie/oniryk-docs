import {
  RouteAction,
  RouteHandler,
  RouteInjector,
  RouteMethod,
  RouteMiddleware,
  RouteMiddlewareContract,
} from '@app/contracts/http.contract';

export function route(
  method: RouteMethod,
  path: string,
  action: RouteHandler,
  middlewares?: RouteMiddlewareContract[]
) {
  return ({ app, db }: RouteInjector) => {
    const handler: RouteAction = (request, response) => {
      action({ request, response, db });
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

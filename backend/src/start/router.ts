import {
  RouteAction,
  RouteHandler,
  RouteInjector,
  RouteMethod,
  RouteMiddleware,
  RouteMiddlewareContract,
} from '@app/contracts/http.contract';
import { withError } from '../helpers/http';
import path from 'path';

export function route(
  method: RouteMethod,
  path: string,
  action: RouteHandler,
  middlewares?: RouteMiddlewareContract[]
) {
  return ({ app }: RouteInjector) => {
    const handler: RouteAction = async (request, response) => {
      try {
        return await action({ request, response });
      } catch (error) {
        withError(response, error);
      }
    };

    const middlewareChain = (middlewares || []).map((cur) => {
      const middleware: RouteMiddleware = (request, response, next) => {
        return cur({ response, request, next });
      };

      return middleware;
    });

    app[method](path, ...middlewareChain, handler);
  };
}

export type GroupContructorFn = (
  method: RouteMethod,
  path: string,
  action: RouteHandler,
  middlewares?: RouteMiddlewareContract[]
) => void;

export type GroupOptions = {
  prefix?: string;
  middlewares?: RouteMiddlewareContract[];
};

export function group(fn: (route: GroupContructorFn) => void, options: GroupOptions) {
  return (injections: RouteInjector) => {
    fn((method, routePath, action, middlewares) => {
      const prefix = options.prefix || '';
      const prefixMiddlewares = options.middlewares || [];
      const routeMiddlewares = prefixMiddlewares.length
        ? prefixMiddlewares.concat(middlewares || [])
        : middlewares;

      route(method, path.join(prefix, routePath), action, routeMiddlewares)(injections);
    });
  };
}

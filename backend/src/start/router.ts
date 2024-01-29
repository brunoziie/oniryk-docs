import { HttpContextContract, MiddlewareFn } from '@app:contracts/http.contract';
import { Hono, TypedResponse } from 'hono';

export type RouteMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type RouteHandler = (
  ctx: HttpContextContract
) => Promise<Response | TypedResponse>;

export type Route = (
  method: RouteMethod,
  path: string,
  handler: RouteHandler,
  middlewares?: MiddlewareFn[]
) => (hono: Hono) => void;

export type Group = (
  prefix: string,
  def: (attrs: { route: Route; group: Group }) => void
) => (hono: Hono) => void;

export const route: Route = (method, path, handler, middlewares = []) => {
  return (hono: Hono) => {
    hono[method](path, ...middlewares, handler);
  };
};

export const group: Group = (prefix, def) => {
  return (hono: Hono) => {
    const app = new Hono();

    const routeFn: Route = (method, path, handler, middlewares = []) => {
      route(method, path, handler, middlewares)(app);
      return () => {};
    };

    const groupFn: Group = (prefix, def) => {
      group(prefix, def)(app);
      return () => {};
    };

    def({
      route: routeFn,
      group: groupFn,
    });

    hono.route(prefix, app);
  };
};

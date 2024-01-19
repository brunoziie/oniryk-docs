import type { Express, NextFunction, Request, Response } from 'express';
import { AuthContract } from './auth.contract';
import knex, { Knex } from 'knex';

declare global {
  namespace Express {
    export interface Request {
      payload: unknown;
    }
  }
}

export type InitializerConfig = {
  setup?: (app: Express) => void;
};

export type HttpServerInitializer = (configs: InitializerConfig) => Express;

export type HttpContextContract = {
  request: Request;
  response: Response;
};

export type RouteHandler = (params: HttpContextContract) => void | Promise<void>;

export type RouteAction = (
  req: Request,
  res: Response,
  next: Function
) => void | Promise<void>;

export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export type RouteMiddlewareContract = (
  context: MiddlewareContext
) => void | Promise<void>;

export type RouteMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RouteInjector = {
  app: Express;
};

export type MiddlewareContext = {
  request: Request;
  response: Response;
  next: NextFunction;
};

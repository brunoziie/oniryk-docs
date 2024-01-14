import type { Express, NextFunction, Request, Response } from 'express';
import { AuthContract } from './auth.contract';
import knex, { Knex } from 'knex';

export type InitializerConfig = {
  setup?: (app: Express) => void;
};

export type HttpServerInitializer = (configs: InitializerConfig) => Express;

export type HttpContextContract = {
  request: Request;
  response: Response;
  db: Knex;
};

export type RouteHandler = (params: HttpContextContract) => void;

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
  db: Knex;
};

export type MiddlewareContext = {
  request: Request;
  response: Response;
  next: NextFunction;
  db: knex.Knex;
};

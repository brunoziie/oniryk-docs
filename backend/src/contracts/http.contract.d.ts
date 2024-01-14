import type { Express, NextFunction, Request, Response } from 'express';
import { AuthContract } from './auth.contract';
import { PrismaClient } from '@prisma/client';
import knex, { Knex } from 'knex';

export type InitializerConfig = {
  setup?: (app: Express) => void;
};

export type HttpServerInitializer = (configs: InitializerConfig) => Express;

export type RouteHandler = (params: {
  request: Request;
  response: Response;
  db: PrismaClient;
}) => void;

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
  db: PrismaClient;
};

export type MiddlewareContext = {
  request: Request;
  response: Response;
  next: NextFunction;
  db: knex.Knex;
};

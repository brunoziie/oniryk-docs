import { EntityType, OwnershipLevel } from '@db:schemas';
import { Context, MiddlewareHandler, Next } from 'hono';
import { AuthUser } from './auth.contract';

declare module 'hono' {
  export interface ContextVariableMap {
    payload?: unknown;
    filter: RequestFilters;
    user?: AuthUser;
    ownership?: [EntityType, OwnershipLevel];
  }
}

export type HttpContextContract = Context;
export type MiddlewareFn = MiddlewareHandler;
export type NextFn = Next;

export type RequestFilters = {
  q: string | null;
  page: number;
  limit: number;
};

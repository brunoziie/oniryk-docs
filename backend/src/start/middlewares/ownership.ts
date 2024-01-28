import { MiddlewareContext } from '@app:contracts/http.contract';
import { withError } from '@app:helpers/http';
import OwnershipRepository from '@db:repositories/ownership';
import { EntityType, OwnershipLevel } from '@db:schemas';

export type OwnershipMiddlewareContext = MiddlewareContext & {
  entity: EntityType;
  entityKey?: string;
  level: OwnershipLevel[];
};

export default async function OwnershipMiddleware(context: OwnershipMiddlewareContext) {
  const { request, response, next } = context;
  const { entity, entityKey, level } = context;
  const { user, params } = request;

  const ownership = await OwnershipRepository.getEntityOwnership(
    entity,
    params[entityKey || 'id'],
    user!.id,
    level
  );

  if (!ownership) {
    return withError(response, new Error('Ownership: Not found'), 404);
  }

  next();
}

export function ownership(
  entity: EntityType,
  level: OwnershipLevel[] = ['owner'],
  entityKey?: string
) {
  return async (context: MiddlewareContext) => {
    await OwnershipMiddleware({ ...context, entity, entityKey, level });
  };
}

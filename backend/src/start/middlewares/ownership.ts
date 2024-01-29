import { MiddlewareFn } from '@app:contracts/http.contract';
import { AppError, FORBIDDEN, UNAUTHORIZED } from '@app:helpers/error';
import OwnershipRepository from '@db:repositories/ownership';
import { EntityType, OwnershipLevel } from '@db:schemas';

export type OwnershipMiddleware = (
  entity: EntityType,
  levels?: OwnershipLevel[],
  idParam?: string
) => MiddlewareFn;

const ownership: OwnershipMiddleware = (entity, levels = [], idParam = 'id') => {
  return async (ctx, next) => {
    const user = ctx.get('user');

    if (!user) {
      throw AppError(
        'auth',
        'you must be authenticated to access this resource',
        UNAUTHORIZED
      );
    }

    const { id: userId } = user;
    const params = ctx.req.param() as Record<string, string>;
    const entityId = params[idParam];

    const ownership = await OwnershipRepository.getEntityOwnership(
      entity,
      entityId,
      userId,
      levels
    );

    if (!ownership) {
      throw AppError('auth', 'you are not allowed to access this resource', FORBIDDEN);
    }

    ctx.set('ownership', [ownership.entity, ownership.level]);

    return next();
  };
};

export default ownership;

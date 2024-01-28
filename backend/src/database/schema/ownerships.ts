import { ref, timestamps, uuid } from '@db:utils';
import { index, mysqlEnum, mysqlTable } from 'drizzle-orm/mysql-core';
import { teams } from './teams';
import { users } from './users';

export const ownerships = mysqlTable(
  'ownerships',
  {
    id: uuid.primary(),
    entity: mysqlEnum('entity', ['project', 'document', 'team']).notNull(),
    entityId: uuid('entity_id').notNull(),
    level: mysqlEnum('level', ['owner', 'viewer', 'writer']).notNull(),
    userId: ref('user_id', users.id),
    teamId: ref('team_id', teams.id),
    ...timestamps(),
  },
  (table) => {
    return {
      entityIdIdx: index('ownerships_entity_id_idx').on(table.entityId),
      userIdIdx: index('ownerships_userId_idx').on(table.userId),
      teamIdIdx: index('ownerships_teamId_idx').on(table.teamId),
      entityEntityIdUserIdIdx: index('ownerships_entity_entity_id_userId_idx').on(
        table.entity,
        table.entityId,
        table.userId
      ),
      entityEntityIdTeamIdIdx: index('ownerships_entity_entity_id_teamId_idx').on(
        table.entity,
        table.entityId,
        table.teamId
      ),
    };
  }
);

export type Ownership = typeof ownerships.$inferSelect;
export type OwnershipInsert = typeof ownerships.$inferInsert;

export type EntityType = Ownership['entity'];
export type OwnershipLevel = Ownership['level'];

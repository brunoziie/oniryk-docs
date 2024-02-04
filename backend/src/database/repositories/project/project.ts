import { db } from '@db:client';
import { Project, ProjectInsert, ownerships, projects, teams, users } from '@db:schemas';
import { form, fulltext } from '@db:utils';
import { and, eq, inArray, isNull, or, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { AuthUser } from '../../../contracts/auth.contract';
import { PaginationContract } from '../../../contracts/pagination.contract';
import TeamRepository from '../team/team';

export default class ProjectRepository {
  static async all(
    user: AuthUser,
    page = 1,
    perPage = 50,
    query?: string
  ): Promise<PaginationContract<Project>> {
    const teams = await TeamRepository.members(user.id);
    const ownershipConds = [eq(ownerships.userId, user.id)];

    if (teams.length) {
      ownershipConds.push(
        inArray(
          ownerships.teamId,
          teams.map((team) => team.id)
        )
      );
    }

    const conditions = and(
      or(...ownershipConds),
      isNull(projects.deletedAt),
      ...(query ? [fulltext([projects.title, projects.description], query)] : [])
    );

    const [total] = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${projects.id})` })
      .from(projects)
      .innerJoin(
        ownerships,
        and(
          eq(ownerships.entityId, projects.id),
          eq(ownerships.entity, 'project'),
          isNull(ownerships.deletedAt)
        )
      )
      .where(conditions);

    const rows = await db
      .select({ projects })
      .from(projects)
      .innerJoin(
        ownerships,
        and(
          eq(ownerships.entityId, projects.id),
          eq(ownerships.entity, 'project'),
          isNull(ownerships.deletedAt)
        )
      )
      .where(conditions)
      .groupBy(projects.id)
      .limit(perPage)
      .offset((page - 1) * perPage);

    return {
      rows: rows.map((p) => p.projects),
      total: total.count,
      page,
      perPage,
    };
  }

  static async find(id: string) {
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), isNull(projects.deletedAt)))
      .limit(1);

    return project || null;
  }

  static async findForUser(user: AuthUser, id: string) {
    const teams = await TeamRepository.members(user.id);
    const ownershipConds = [eq(ownerships.userId, user.id)];

    if (teams.length) {
      ownershipConds.push(
        inArray(
          ownerships.teamId,
          teams.map((team) => team.id)
        )
      );
    }

    const [row] = await db
      .select({ projects })
      .from(projects)
      .innerJoin(
        ownerships,
        and(
          eq(ownerships.entityId, projects.id),
          eq(ownerships.entity, 'project'),
          isNull(ownerships.deletedAt)
        )
      )
      .where(and(or(...ownershipConds), eq(projects.id, id), isNull(projects.deletedAt)))
      .limit(1);

    return row ? row.projects : null;
  }

  static async create(user: AuthUser, data: ProjectInsert) {
    const id = randomUUID();

    await db.transaction(async (trx) => {
      await trx.insert(projects).values({ ...data, id });
      await trx.insert(ownerships).values({
        entity: 'project',
        entityId: id,
        userId: user.id,
        level: 'owner',
        teamId: null,
      });
    });

    return id;
  }

  static async update(id: string, data: Omit<ProjectInsert, 'id'>) {
    const formdata = form(data, ['title', 'description']);

    if (formdata.isNotEmpty()) {
      await db.update(projects).set(formdata.values).where(eq(projects.id, id));
    }

    return true;
  }

  static async members(id: string) {
    const rows = await db
      .select()
      .from(ownerships)
      .leftJoin(users, and(eq(ownerships.userId, users.id), isNull(users.deletedAt)))
      .leftJoin(teams, and(eq(ownerships.teamId, teams.id), isNull(teams.deletedAt)))
      .where(
        and(
          eq(ownerships.entityId, id),
          eq(ownerships.entity, 'project'),
          isNull(ownerships.deletedAt)
        )
      );

    return rows.map((row) => {
      return {
        type: row.ownerships.teamId ? 'team' : 'user',
        id: row.ownerships.teamId || row.ownerships.userId,
        name: row.ownerships.teamId ? row.teams?.name : row.users?.displayName,
        level: row.ownerships.level,
      };
    });
  }

  static async delete(id: string) {
    return await db.transaction(async (trx) => {
      await trx
        .update(projects)
        .set({ deletedAt: new Date() })
        .where(eq(projects.id, id));

      await trx
        .update(ownerships)
        .set({ deletedAt: new Date() })
        .where(and(eq(ownerships.entityId, id), eq(ownerships.entity, 'project')));
    });
  }
}

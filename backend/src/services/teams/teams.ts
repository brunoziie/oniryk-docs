import { AuthUser } from '@app:contracts/auth.contract';
import TeamRepository from '@db:repositories/team/team';
import { Team, TeamInsert } from '@db:schemas';
import { Updatable } from '@db:utils';

export default class TeamService {
  static async all(user: AuthUser, page = 1, perPage = 50, query?: string) {
    return await TeamRepository.all(user, page, perPage, query);
  }

  static async getTeam(id: string, withMembers = false) {
    const team = await TeamRepository.find(id);

    if (!team) {
      return null;
    }

    if (withMembers) {
      const members = await TeamRepository.members(id);
      return { ...team, members };
    }

    return team;
  }

  static async create(user: AuthUser, data: TeamInsert) {
    return TeamRepository.create(data.name, user.id);
  }

  static async update(id: string, data: Updatable<Team>) {
    return await TeamRepository.update(id, data);
  }

  static async delete(id: string) {
    return await TeamRepository.delete(id);
  }
}

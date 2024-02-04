import { AppError } from '@app:helpers/error';
import { db } from '@db:client';
import TeamMemberRepository from '@db:repositories/team/member';
import { OwnershipLevel } from '@db:schemas';

export class TeamMembersService {
  static async all(teamId: string, search?: string) {
    return await TeamMemberRepository.all(teamId, search);
  }

  static async create(teamId: string, userId: string, level: OwnershipLevel) {
    return await TeamMemberRepository.create(teamId, userId, level);
  }

  static async update(teamId: string, userId: string, level: OwnershipLevel) {
    return await db.transaction(async (trx) => {
      const op = await TeamMemberRepository.update(teamId, userId, level, trx);
      const hasOwnerLeft = await TeamMemberRepository.hasOwnerOnTeam(teamId, trx);

      if (!hasOwnerLeft) {
        throw AppError('team', 'at least one owner is required on a team', 400);
      }

      return op;
    });
  }

  static async remove(teamId: string, userId: string) {
    return await db.transaction(async (trx) => {
      const op = await TeamMemberRepository.delete(teamId, userId, trx);
      const hasOwnerLeft = await TeamMemberRepository.hasOwnerOnTeam(teamId, trx);

      if (!hasOwnerLeft) {
        throw AppError('team', 'at least one owner is required on a team', 400);
      }

      return op;
    });
  }
}

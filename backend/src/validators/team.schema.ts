import Zod from 'zod';

export const createTeam = Zod.object({
  name: Zod.string().min(3).max(255),
});

export const updateTeam = Zod.object({
  name: Zod.string().min(3).max(255).optional(),
});

export const createTeamMember = Zod.object({
  userId: Zod.string().uuid(),
  level: Zod.enum(['owner', 'writer', 'viewer']),
});

export const updateTeamMember = Zod.object({
  level: Zod.enum(['owner', 'writer', 'viewer']),
});

export type CreateTeamPayload = Zod.infer<typeof createTeam>;
export type UpdateTeamPayload = Zod.infer<typeof updateTeam>;
export type CreateTeamMemberPayload = Zod.infer<typeof createTeamMember>;
export type UpdateTeamMemberPayload = Zod.infer<typeof updateTeamMember>;

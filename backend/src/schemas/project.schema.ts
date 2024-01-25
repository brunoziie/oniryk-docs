import Zod from 'zod';

export const createProject = Zod.object({
  title: Zod.string().min(3).max(255),
  description: Zod.string().nullable().optional(),
});

export const updateProject = Zod.object({
  title: Zod.string().min(3).max(255).optional(),
  description: Zod.string().nullable().optional(),
});

export type CreateProjectPayload = Zod.infer<typeof createProject>;
export type UpdateProjectPayload = Zod.infer<typeof updateProject>;

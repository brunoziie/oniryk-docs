import Zod from 'zod';

export const updateAccount = Zod.object({
  display_name: Zod.string(),
  username: Zod.string().min(3),
  email: Zod.string().email(),
  password: Zod.string().min(6),
  favorite_color: Zod.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  avatar: Zod.string().url(),
}).partial();

export type UpdateAccountPayload = Zod.infer<typeof updateAccount>;

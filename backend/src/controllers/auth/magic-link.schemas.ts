import * as Zod from 'zod';

export const store = Zod.object({
  email: Zod.string().email(),
});

export const login = Zod.object({
  code: Zod.string().min(32).max(32),
});

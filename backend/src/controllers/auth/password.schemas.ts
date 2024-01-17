import Zod from 'zod';

export const login = Zod.object({
  password: Zod.string(),
  email: Zod.string().email(),
});

export const forgotPassword = Zod.object({
  email: Zod.string().email(),
});

export const resetPassword = Zod.object({
  password: Zod.string(),
  code: Zod.string().min(64).max(64),
});

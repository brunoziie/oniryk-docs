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
  code: Zod.string().min(36).max(36),
});

export type LoginPayload = Zod.infer<typeof login>;
export type ForgotPasswordPayload = Zod.infer<typeof forgotPassword>;
export type ResetPasswordPayload = Zod.infer<typeof resetPassword>;

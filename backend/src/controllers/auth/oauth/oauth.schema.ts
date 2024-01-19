import Zod from 'zod';

export const callback = Zod.object({
  code: Zod.string(),
});

export type CallbackPayload = Zod.infer<typeof callback>;

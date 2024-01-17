import Zod from 'zod';

export const callback = Zod.object({
  code: Zod.string(),
});

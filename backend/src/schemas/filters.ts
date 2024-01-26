import Zod from 'zod';

const MAX_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 20;

export const defaultFilters = Zod.object({
  q: Zod.string().optional(),
  page: Zod.coerce.number().optional().default(1),
  perPage: Zod.coerce.number().max(MAX_PAGE_SIZE).optional().default(DEFAULT_PAGE_SIZE),
});

export type DefaultFilters = Zod.infer<typeof defaultFilters>;

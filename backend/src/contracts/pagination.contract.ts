export type PaginationContract<T> = {
  rows: T[];
  total: number;
  page: number;
  perPage: number;
};

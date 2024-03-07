export interface PaginationType<T> {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  cursor: number;
  nextCursor: number;
  items: T[];
}

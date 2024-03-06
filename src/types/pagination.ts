export interface PaginationType<T> {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  items: T[];
}

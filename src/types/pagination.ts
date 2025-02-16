export interface IPagination<T> {
  data: T[],
  currentPage: number,
  totalCount: number,
  totalPages: number,
}

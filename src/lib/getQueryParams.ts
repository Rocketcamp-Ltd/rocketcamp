import { IPaginationQuery, ISearchQuery } from '@/types/query';

export function getQueryParams<T extends IPaginationQuery | ISearchQuery>(data: T): string {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

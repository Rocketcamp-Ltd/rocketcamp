import { IPaginationQuery, ISearchQuery } from '@/types/query';

interface QueryParams {
  [key: string]: number | number[] | string | string[];
}

export function getQueryParams<T extends IPaginationQuery | ISearchQuery>(data: T | QueryParams): string {
  const getStringByArray = (value: string[] | number[]) => value.join('');

  return Object.entries(data)
    .map(([key, value]) => `${key}=${Array.isArray(value) ? getStringByArray(value) : value}`)
    .join('&');
}

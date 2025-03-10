import type { AxiosInstance } from 'axios';
import type { Course, CourseCategory, CourseDetails } from '@/types/courses';
import type { IPaginationQuery } from '@/types/query';
import type { IPagination } from '@/types/pagination';
import { getQueryParams } from '@/lib/getQueryParams';

export const courseModule = (client: AxiosInstance) => ({
  getContinueLearning: (query?: IPaginationQuery): Promise<IPagination<Course>> => {
    let url = '/continue-learning';

    if (query) {
      url = `${url}?${getQueryParams(query)}`;
    }

    return client.get(url);
  },

  getRecommendedCourses: (query?: IPaginationQuery): Promise<IPagination<Course>> => {
    let url = '/recommended';

    if (query) {
      url = `${url}?${getQueryParams(query)}`;
    }

    return client.get(url);
  },

  getCoursesByAlias: (alias: string, query?: IPaginationQuery): Promise<IPagination<Course>> => {
    let url = `/courses/${alias}`;

    if (query) {
      url = `${url}?${getQueryParams(query)}`;
    }

    return client.get(url);
  },

  getCourseDetails: (alias: string, id: number): Promise<CourseDetails> => {
    return client.get(`/courses/${alias}/${id}`);
  },

  getCoursesByCategory: (ids: number[], page: number = 1): Promise<IPagination<Course>> => {
    return client.get(`/courses/filter?${getQueryParams({ ids, page })}`);
  },

  getCategories: (): Promise<CourseCategory[]> => {
    return client.get('/courses/categories');
  },
});

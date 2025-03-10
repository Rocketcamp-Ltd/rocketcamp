import type { Course } from '@/types/courses';

export const continueCourses: Course[] = [
  {
    id: 1,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 1',
    subtitle: 'Subtitle 1',
    progress: 10,
  },
  {
    id: 2,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 2',
    subtitle: 'Subtitle 2',
    progress: 45,
  },
  {
    id: 3,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 3',
    subtitle: 'Subtitle 3',
    progress: 27,
  },
  {
    id: 4,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 4',
    subtitle: 'Subtitle 4',
    progress: 73,
  },
  {
    id: 5,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 5',
    subtitle: 'Subtitle 5',
    progress: 15,
  },
  {
    id: 6,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 6',
    subtitle: 'Subtitle 6',
    progress: 90,
  },
  {
    id: 7,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 7',
    subtitle: 'Subtitle 7',
    progress: 32,
  },
  {
    id: 8,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 8',
    subtitle: 'Subtitle 8',
    progress: 68,
  },
  {
    id: 9,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 9',
    subtitle: 'Subtitle 9',
    progress: 54,
  },
  {
    id: 10,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 10',
    subtitle: 'Subtitle 10',
    progress: 41,
  },
];

export const recommended: Course[] = [
  {
    id: 1,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 1',
    subtitle: 'Subtitle 1',
    progress: 0,
  },
  {
    id: 2,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 2',
    subtitle: 'Subtitle 2',
    progress: 45,
  },
  {
    id: 3,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 3',
    subtitle: 'Subtitle 3',
    progress: 27,
  },
  {
    id: 4,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 4',
    subtitle: 'Subtitle 4',
    progress: 60,
  },
  {
    id: 5,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 5',
    subtitle: 'Subtitle 5',
    progress: 15,
  },
  {
    id: 6,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 6',
    subtitle: 'Subtitle 6',
    progress: 90,
  },
  {
    id: 7,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 7',
    subtitle: 'Subtitle 7',
    progress: 0,
  },
  {
    id: 8,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 8',
    subtitle: 'Subtitle 8',
    progress: 0,
  },
  {
    id: 9,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 9',
    subtitle: 'Subtitle 9',
    progress: 0,
  },
  {
    id: 10,
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    title: 'Course 10',
    subtitle: 'Subtitle 10',
    progress: 0,
  },
];

export const other: { [key: string]: Course[] } = {
  title: [...continueCourses],
  title2: [...recommended],
  title3: [...continueCourses, ...recommended].slice(0, 5),
};

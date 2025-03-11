import type { CourseDetails } from '@/types/courses';

export const mock: CourseDetails = {
  id: 1,
  cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
  title: 'Course 1',
  subtitle: 'Subtitle 1',
  progress: 20,
  category: [
    {
      id: 1,
      alias: 'alias',
      name: 'name category',
    },
  ],
  description:
    'Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look: <br/><br/> Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning.',
  lessons: [
    {
      id: 1,
      title: 'lesson 1',
      description: 'descr 1',
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      isDone: true,
      isBlocked: false,
      progress: 100,
    },
    {
      id: 2,
      title: 'lesson 2',
      description: 'descr 2',
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      isDone: false,
      isBlocked: false,
      progress: 40,
    },
    {
      id: 3,
      title: 'lesson 3',
      description: 'descr 3',
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      isDone: false,
      isBlocked: true,
      progress: 0,
    },
    {
      id: 4,
      title: 'lesson 4',
      description: 'descr 4',
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      isDone: false,
      isBlocked: true,
      progress: 0,
    },
    {
      id: 5,
      title: 'lesson 5',
      description: 'descr 5',
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      isDone: false,
      isBlocked: true,
      progress: 0,
    },
  ],
};

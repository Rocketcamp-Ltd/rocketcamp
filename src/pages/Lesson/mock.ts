import { LessonDetails } from '@/types/lessons';

export const mock: LessonDetails = {
    id: 1,
    title: 'lesson 1',
    description: 'descr 1',
    cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
    isDone: true,
    isBlocked: false,
    progress: 0,
    steps: [
      {
        id: 1,
        cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
        coverAnnotation: 'cover annotation',
        text: 'text',
        isDone: false,
        component: {
          type: 'selectedButtons',
          items: [{ id: 1, label: 'item 1' }, { id: 2, label: 'item 2' }],
        },
      },
      {
        id: 2,
        cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
        coverAnnotation: 'cover annotation',
        text: 'text 224gwrgwrg lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ',
        isDone: false,
        component: {
          type: 'radioButtons',
          items: [{ id: 1, label: 'item 1' }, { id: 2, label: 'item 2' }],
        },
      },
      {
        id: 3,
        cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
        coverAnnotation: 'cover annotation',
        text: 'text ghehehehehhae getahah hetheh t wrgethet  wgwggh  tgwgwg 224gwrgwrg lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ',
        isDone: false,
        component: {
          type: 'radioButtons',
          items: [{ id: 1, label: 'item 1' }, { id: 2, label: 'item 2' }],
        },
      },
      {
        id: 4,
        cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
        coverAnnotation: 'cover annotation',
        text: 'text',
        isDone: false,
        component: {
          type: 'selectedButtons',
          items: [{ id: 1, label: 'item 1' }, { id: 2, label: 'item 2' }],
        },
      },
    ]
}

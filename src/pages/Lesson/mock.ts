import { LessonDetails } from '@/types/lessons';

// @ts-ignore
export const mock: LessonDetails = {
  id: 1,
  title: 'lesson 1',
  description:
    "<p>The staff in a chain of three busy coffee shops feel stressed and overworked. We'll use transaction data to help them keep up with customer demand.</p>",
  cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
  isDone: true,
  isBlocked: false,
  progress: 0,
  steps: [
    {
      id: 1,
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      coverAnnotation: 'cover annotation',
      text: 'It looks like Store 11 has the most need. But demand for coffee is not constant throughout the day, so it would be helpful to see how this varies over time. Which visualization would you choose for this?',
      isDone: false,
      component: null,
    },
    {
      id: 2,
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      coverAnnotation: 'cover annotation',
      text: 'Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?',
      isDone: false,
      component: {
        type: 'selectedButtons',
        items: [
          { id: 1, label: 'item 1' },
          { id: 2, label: 'item 2' },
        ],
      },
    },
    {
      id: 3,
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      coverAnnotation: 'cover annotation',
      text: 'text 224gwrgwrg lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ',
      isDone: false,
      component: {
        type: 'radioButtons',
        items: [
          { id: 1, label: 'item 1' },
          { id: 2, label: 'item 2' },
        ],
      },
    },
    {
      id: 4,
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      coverAnnotation: 'cover annotation',
      text: 'text ghehehehehhae getahah hetheh t wrgethet  wgwggh  tgwgwg 224gwrgwrg lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. ',
      isDone: false,
      component: {
        type: 'radioButtons',
        items: [
          { id: 1, label: 'item 1' },
          { id: 2, label: 'item 2' },
        ],
      },
    },
    {
      id: 5,
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      coverAnnotation: 'cover annotation',
      text: 'text пропущен',
      isDone: false,
      component: {
        type: 'selectedButtons',
        items: [
          { id: 1, label: 'item 1' },
          { id: 2, label: 'item 2' },
        ],
      },
    },
        {
      id: 6,
      cover: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
      coverAnnotation: 'cover annotation',
      text: 'Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this? Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?Which visualization would you choose for this?',
      isDone: false,
      component: {
        type: 'slider',
        items: [
          {
            id: 1,
            componentType: 'text',
            text: 'text text texttexttexttexttexttexttext text text text',
          },
          {
            id: 2,
            componentType: 'image',
            src: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
            annotation: 'annotation',
          },
          {
            id: 3,
            componentType: 'image',
            src: 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400',
            annotation: 'annotation',
          },
        ],
      },
    },
  ],
};

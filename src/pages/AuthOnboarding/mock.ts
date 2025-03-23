import { AuthOnboarding } from '@/types/authOnboarding';

const onb: AuthOnboarding[] = [
  {
    id: 1,
    title: "Let's Personalise Your Learning Journey",
    text: 'Every leader faces unique challenges. Tell us about your context so we can:<ul><li>Customize exercises for your industry</li><li>Match content to your experience level</li><li>Align learning paths with your goals</li></ul>',
    button: {
      type: 'primary',
      label: 'Start personalisation',
      action: 'next',
    },
    components: [],
  },
  {
    id: 2,
    title: 'What is your current role?',
    text: 'What is your current or most recent job position at work?',
    button: {
      type: 'secondary',
      label: 'Next',
      action: 'next',
    },
    components: [
      {
        type: 'input',
        placeholder: 'i.e. Project Manager',
        pattern: null,
        label: '',
      },
    ],
  },
  {
    id: 3,
    title: 'What is your field of work?',
    text: 'What industry do you work in?',
    button: {
      type: 'secondary',
      label: 'Next',
      action: 'next',
    },
    components: [
      {
        type: 'select',
        placeholder: 'Healthcare',
        label: '',
        items: [
          { id: 1, name: 'Healthcare' },
          { id: 2, name: 'Technology' },
          { id: 3, name: 'Finance' },
          { id: 4, name: 'Education' },
          { id: 5, name: 'Manufacturing' },
          { id: 6, name: 'Retail' },
          { id: 7, name: 'Government' },
          { id: 8, name: 'Non-profit' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Current status',
    text: '',
    button: {
      type: 'secondary',
      label: 'Next',
      action: 'next',
    },
    components: [
      {
        type: 'checkboxGroup',
        items: [
          { id: 1, name: 'Employed full-time' },
          { id: 2, name: 'Employed part-time' },
          { id: 3, name: 'Seeking opportunities' },
          { id: 4, name: 'Student' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'How many people do you manage at work?',
    text: '',
    button: {
      type: 'secondary',
      label: 'Next',
      action: 'next',
    },
    components: [
      {
        type: 'radioGroup',
        items: [
          { id: 1, name: 'No direct reports' },
          { id: 2, name: '1-5 team members' },
          { id: 3, name: '6-15 team members' },
          { id: 4, name: '15+ team members' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'In your current role, what type of projects do you typically manage?',
    text: '',
    button: {
      type: 'primary',
      label: 'Next',
      action: 'next',
    },
    components: [
      {
        type: 'radioGroup',
        items: [
          { id: 1, name: 'Technology/Software Development' },
          { id: 2, name: 'Business Transformation' },
          { id: 3, name: 'Marketing/Communication' },
          { id: 4, name: 'Research & Development' },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'What is your primary goal?',
    text: '',
    button: {
      type: 'primary',
      label: 'Next',
      action: 'next',
    },
    components: [
      {
        type: 'chips',
        items: [
          { id: 1, name: 'Improve team leadership skills' },
          { id: 2, name: 'Develop strategic thinking' },
          { id: 3, name: 'Drive organizational change' },
          { id: 4, name: 'Master project management' },
          { id: 5, name: 'Build financial acumen' },
          { id: 6, name: 'Enhance communication' },
          { id: 7, name: 'Transition to management' },
          { id: 8, name: 'Advance in current role' },
          { id: 9, name: 'Switch industries' },
          { id: 10, name: 'Return to workforce' },
          { id: 11, name: 'Other' },
        ],
      },
    ],
  },
];

export default onb;

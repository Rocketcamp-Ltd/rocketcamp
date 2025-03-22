export interface Lesson {
  id: number;
  title: string;
  description: string;
  cover: string;
  isDone: boolean;
  isBlocked: boolean;
  progress: number;
}

export interface LessonDetails {
  id: number;
  title: string;
  description: string;
  cover: string;
  isDone: boolean;
  isBlocked: boolean;
  progress: number;
  steps: LessonStep[];
}

export interface LessonStep {
  id: number;
  cover: string;
  coverAnnotation: string;
  text: string;
  isDone: boolean;
  component: LessonComponent | null;
}

export interface LessonComponent {
  type: 'selectedButtons' | 'radioButtons';
  items: {
    id: number;
    label: string;
  }[];
}

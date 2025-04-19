export interface Lesson {
  id: number;
  title: string;
  description: string;
  card_description: string;
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
  // New fields for Supabase integration
  currentStepIndex: number; // Changed from optional to required with default -1
  visibleSteps: number[];
  completedSteps?: number[];
}

export interface LessonStep {
  id: number;
  cover: string;
  coverAnnotation: string;
  text: string;
  isDone: boolean;
  component: LessonComponent | null;
}

export type LessonComponent = SelectedButtonsComponent | RadioButtonsComponent | SliderComponent;

interface SelectedButtonsComponent {
  type: 'selectedButtons';
  items: {
    id: number;
    label: string;
  }[];
}

interface RadioButtonsComponent {
  type: 'radioButtons';
  items: {
    id: number;
    label: string;
  }[];
}

interface SliderTextItem {
  id: number;
  componentType: 'text';
  text: string;
}

interface SliderImageItem {
  id: number;
  componentType: 'image';
  src: string;
  annotation?: string;
}

interface SliderComponent {
  type: 'slider';
  items: (SliderTextItem | SliderImageItem)[];
}
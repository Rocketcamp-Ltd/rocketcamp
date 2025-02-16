import { Lesson } from './lessons';

export interface Course {
  id: number;
  cover: string;
  title: string;
  subtitle: string;
  progress: number;
}

export interface CourseDetails extends Course {
  description: string;
  lessons: Lesson[];
}

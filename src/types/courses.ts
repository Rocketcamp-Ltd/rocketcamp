import { Lesson } from './lessons';

export interface Course {
  id: number;
  cover: string;
  title: string;
  subtitle: string;
  progress: number;
  category: CourseCategory[];
}

export interface CourseDetails extends Course {
  description: string;
  lessons: Lesson[];
}

export interface CourseCategory {
  id: number;
  alias: string;
  name: string;
}

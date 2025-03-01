import { client } from './client';
import { courseModule } from './modules/course';

export const api = {
  profile: courseModule(client),
};

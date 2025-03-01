import { client } from './client';
import { authModule } from './modules/auth';
import { courseModule } from './modules/course';

export const api = {
  profile: courseModule(client),
  auth: authModule(client),
};

import type { AxiosInstance } from 'axios';
import type { User } from '@/types/user';
import type { AuthOnboarding } from '@/types/authOnboarding';

interface LoginPayload {
  email: string;
  password: string;
}

export const authModule = (client: AxiosInstance) => ({
  // @todo: return User & Tokens
  login(payload: LoginPayload): Promise<User> {
    return client.post('/auth/login', payload);
  },

  // @todo: any kaka
  logout(): Promise<any> {
    return client.post('/auth/logout');
  },

  // @todo: rename to register payload
  // @todo: return User & Tokens
  register(payload: LoginPayload): Promise<User> {
    return client.post('/auth/register', payload);
  },

  getOnboarding(): Promise<AuthOnboarding> {},
});

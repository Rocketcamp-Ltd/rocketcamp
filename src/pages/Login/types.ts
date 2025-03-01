export enum FormFieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface LoginData {
  email: string;
  password: string;
  errors?: {
    [key in FormFieldNames | 'general']?: string;
  };
}

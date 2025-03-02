export enum FormFieldNames {
  NAME = 'name',
  SURNAME = 'surname',
  EMAIL = 'email',
  MESSAGE = 'message',
}

export interface ProfileData {
  name: string;
  surname: string;
  email: string;
  message: string;
  errors?: {
    [key in FormFieldNames | 'general']?: string;
  };
}

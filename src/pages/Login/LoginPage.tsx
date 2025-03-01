import React, { useActionState } from 'react';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

import { validateLogin, ValidationErrorCode } from './utils/validation';
import { FormFieldNames } from './types';

interface LoginData {
  email: string;
  password: string;
  errors?: {
    [key in FormFieldNames | 'general']?: string;
  };
}

const initialState: LoginData = {
  email: '',
  password: '',
  errors: {},
};

// Функция для перевода кодов ошибок
// В реальном проекте здесь можно использовать i18n библиотеку
const getErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    [ValidationErrorCode.REQUIRED]: 'Поле обязательно для заполнения',
    [ValidationErrorCode.INVALID_EMAIL]: 'Неверный формат email',
    [ValidationErrorCode.PASSWORD_TOO_SHORT]: 'Пароль должен содержать минимум 6 символов',
    [ValidationErrorCode.PASSWORD_NO_DIGIT]: 'Пароль должен содержать хотя бы одну цифру',
    'UNKNOWN_ERROR': 'Произошла ошибка при входе'
  };

  return errorMessages[code] || 'Неизвестная ошибка';
};

const formAction = async (_: LoginData, formData: FormData) => {
  const email = formData.get(FormFieldNames.EMAIL) as string;
  const password = formData.get(FormFieldNames.PASSWORD) as string;

  const validationResult = await validateLogin({ email, password });

  if (validationResult.success) {
    // @todo: здесь запрос на бэк и редирект на страницу входа

    return { email, password };
  } else {
    const errorMessages: { [key: string]: string } = {};

    validationResult.errors?.forEach(error => {
      errorMessages[error.fieldName] = getErrorMessage(error.code);
    });

    return {
      email,
      password,
      errors: errorMessages
    };
  }
};

const LoginPage: React.FC = () => {
  const [state, action, pending] = useActionState<LoginData, FormData>(formAction, initialState);

  return (
    <form action={action} className="border-[#D9D9D9] w-80 rounded-[2px] border p-6 shadow-md">
      <label className="mb-1 flex flex-col gap-2">
        <p className="text-base text-[#1E1E1E]">Email</p>
        <Input
          type="email"
          placeholder="Email"
          name={FormFieldNames.EMAIL}
          className="w-full"
          defaultValue={state.email}
        />
      </label>
      {state.errors?.[FormFieldNames.EMAIL] && (
        <p className="mb-3 text-sm text-red-500">{state.errors[FormFieldNames.EMAIL]}</p>
      )}

      <label className="mb-1 flex flex-col gap-2 mt-4">
        <p className="text-base text-[#1E1E1E]">Password</p>
        <Input
          type="password"
          placeholder="Password"
          name={FormFieldNames.PASSWORD}
          className="w-full"
          defaultValue={state.password}
        />
      </label>
      {state.errors?.[FormFieldNames.PASSWORD] && (
        <p className="mb-3 text-sm text-red-500">{state.errors[FormFieldNames.PASSWORD]}</p>
      )}

      {state.errors?.general && (
        <p className="mb-3 mt-2 text-sm text-red-500">{state.errors.general}</p>
      )}

      <Button
        className="w-full mt-4"
        type="submit"
        disabled={pending}
      >
        Sign in
      </Button>
    </form>
  );
};

export default LoginPage;

import { ValidationErrorCode } from './validation';

export const getErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    [ValidationErrorCode.REQUIRED]: 'Поле обязательно для заполнения',
    [ValidationErrorCode.INVALID_EMAIL]: 'Неверный формат email',
    [ValidationErrorCode.PASSWORD_TOO_SHORT]: 'Пароль должен содержать минимум 6 символов',
    [ValidationErrorCode.PASSWORD_NO_DIGIT]: 'Пароль должен содержать хотя бы одну цифру',
    'UNKNOWN_ERROR': 'Произошла ошибка при входе'
  };

  return errorMessages[code] || 'Неизвестная ошибка';
};

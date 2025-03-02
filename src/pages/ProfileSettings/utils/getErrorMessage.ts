import { ValidationErrorCode } from './validation';

export const getErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    [ValidationErrorCode.REQUIRED]: 'Поле обязательно для заполнения',
    [ValidationErrorCode.INVALID_EMAIL]: 'Неверный формат email',
    [ValidationErrorCode.INVALID_NAME]: 'Имя должно содержать только буквы',
    [ValidationErrorCode.NAME_TOO_SHORT]: 'Имя должно содержать минимум 2 символа',
    [ValidationErrorCode.INVALID_SURNAME]: 'Фамилия должна содержать только буквы',
    [ValidationErrorCode.SURNAME_TOO_SHORT]: 'Фамилия должна содержать минимум 3 символа',
    UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
  };

  return errorMessages[code] || 'Неизвестная ошибка';
};

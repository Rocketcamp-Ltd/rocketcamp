import { z } from 'zod';
import { FormFieldNames } from '../types';
import { EMAIL, SYMBOLS_ONLY } from '@/app/common/regex';

export enum ValidationErrorCode {
  REQUIRED = 'REQUIRED',
  INVALID_NAME = 'INVALID_NAME',
  NAME_TOO_SHORT = 'NAME_TOO_SHORT',
  INVALID_SURNAME = 'INVALID_SURNAME',
  SURNAME_TOO_SHORT = 'SURNAME_TOO_SHORT',
  INVALID_EMAIL = 'INVALID_EMAIL',
}

const profileSchema = z.object({
  [FormFieldNames.NAME]: z
    .string({
      required_error: ValidationErrorCode.REQUIRED,
    })
    .min(2, ValidationErrorCode.NAME_TOO_SHORT)
    .regex(SYMBOLS_ONLY, ValidationErrorCode.INVALID_NAME),

  [FormFieldNames.SURNAME]: z
    .string()
    .min(3, ValidationErrorCode.SURNAME_TOO_SHORT)
    .regex(SYMBOLS_ONLY, ValidationErrorCode.INVALID_SURNAME)
    .optional(),

  [FormFieldNames.EMAIL]: z
    .string({
      required_error: ValidationErrorCode.REQUIRED,
    })
    .email(ValidationErrorCode.INVALID_EMAIL)
    .regex(EMAIL, ValidationErrorCode.INVALID_EMAIL),

  [FormFieldNames.MESSAGE]: z
    .string()
    .optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ValidationError {
  fieldName: string;
  code: string;
}

interface ValidationResult {
  success: boolean;
  data?: ProfileFormData;
  errors?: ValidationError[];
}

export function validateProfile(data: unknown): Promise<ValidationResult> {
  return new Promise(resolve => {
    try {
      const validatedData = profileSchema.parse(data);

      resolve({
        success: true,
        data: validatedData,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationError[] = error.errors.map(err => ({
          fieldName: err.path[0]?.toString() || '',
          code: err.message,
        }));

        console.error('Ошибки валидации:', errors);
        resolve({ success: false, errors });
      } else {
        resolve({
          success: false,
          errors: [{ fieldName: 'general', code: 'UNKNOWN_ERROR' }],
        });
      }
    }
  });
}

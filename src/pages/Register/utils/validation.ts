import { z } from 'zod';
import { FormFieldNames } from '../types';

export enum ValidationErrorCode {
  REQUIRED = 'REQUIRED',
  INVALID_EMAIL = 'INVALID_EMAIL',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORD_NO_DIGIT = 'PASSWORD_NO_DIGIT',
}

const loginSchema = z.object({
  [FormFieldNames.EMAIL]: z
    .string({
      required_error: ValidationErrorCode.REQUIRED,
    })
    .email(ValidationErrorCode.INVALID_EMAIL)
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ValidationErrorCode.INVALID_EMAIL),
  [FormFieldNames.PASSWORD]: z
    .string({
      required_error: ValidationErrorCode.REQUIRED,
    })
    .min(6, ValidationErrorCode.PASSWORD_TOO_SHORT)
    .regex(/^(?=.*\d).{6,}$/, ValidationErrorCode.PASSWORD_NO_DIGIT),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface ValidationError {
  fieldName: string;
  code: string;
}

export interface ValidationResult {
  success: boolean;
  data?: LoginFormData;
  errors?: ValidationError[];
}

export function validateLogin(data: unknown): Promise<ValidationResult> {
  return new Promise(resolve => {
    try {
      const validatedData = loginSchema.parse(data);
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

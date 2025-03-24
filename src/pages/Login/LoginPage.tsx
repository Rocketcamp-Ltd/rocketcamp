import React, { useActionState } from 'react';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast, Toaster } from 'sonner';

import { validateLogin } from './utils/validation';
import { useClient } from '@/lib/useClient';
import { getErrorMessage } from './utils/getErrorMessage';
import { FormFieldNames, type LoginData } from './types';
import { useNavigate } from 'react-router-dom';

const initialState: LoginData = {
  email: '',
  password: '',
  errors: {},
  success: false,
};

const supabase = useClient();

const formAction = async (_: LoginData, formData: FormData) => {
  const email = formData.get(FormFieldNames.EMAIL) as string;
  const password = formData.get(FormFieldNames.PASSWORD) as string;

  const validationResult = await validateLogin({ email, password });
  const navigate = useNavigate();

  if (validationResult.success) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { email, password, errors: { general: error.message } };
    }

    toast.success('Login successful');

    navigate('/');

    return { email, password, success: true };
  } else {
    const errorMessages: { [key: string]: string } = {};

    validationResult.errors?.forEach(error => {
      errorMessages[error.fieldName] = getErrorMessage(error.code);
    });

    toast.error('Login failed');

    return {
      email,
      password,
      errors: errorMessages,
      success: false,
    };
  }
};

const LoginPage: React.FC = () => {
  const [state, action, pending] = useActionState<LoginData, FormData>(formAction, initialState);

  return (
    <>
      <Toaster
        richColors
        position="top-center"
      />
      <form
        action={action}
        className="w-80 rounded-[2px] border border-[#D9D9D9] p-6 shadow-md"
      >
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

        <label className="mt-4 mb-1 flex flex-col gap-2">
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

        {state.errors?.general && <p className="mt-2 mb-3 text-sm text-red-500">{state.errors.general}</p>}

        <Button
          className="mt-4 w-full"
          type="submit"
          disabled={pending}
        >
          {pending ? (
            <div className="flex items-center justify-center">
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading...
            </div>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginPage;

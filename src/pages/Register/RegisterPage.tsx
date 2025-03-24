import React, { useActionState } from 'react';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast, Toaster } from 'sonner';

import { useClient } from '@/lib/useClient';
import { validateLogin } from './utils/validation';
import { getErrorMessage } from './utils/getErrorMessage';
import { FormFieldNames, type RegisterData } from './types';

const initialState: RegisterData = {
  email: '',
  password: '',
  errors: {},
};

const formAction = async (_: RegisterData, formData: FormData) => {
  const email = formData.get(FormFieldNames.EMAIL) as string;
  const password = formData.get(FormFieldNames.PASSWORD) as string;
  const supabase = useClient();

  const validationResult = await validateLogin({ email, password });

  if (validationResult.success) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { email, password, errors: { general: error.message } };
    }

    toast.success('Check email for verification ');

    return { email, password };
  } else {
    const errorMessages: { [key: string]: string } = {};

    validationResult.errors?.forEach(error => {
      errorMessages[error.fieldName] = getErrorMessage(error.code);
    });

    toast.error('Registration failed');

    return {
      email,
      password,
      errors: errorMessages,
    };
  }
};

const LoginPage: React.FC = () => {
  const [state, action, pending] = useActionState<RegisterData, FormData>(formAction, initialState);

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
          Register
        </Button>
      </form>
    </>
  );
};

export default LoginPage;

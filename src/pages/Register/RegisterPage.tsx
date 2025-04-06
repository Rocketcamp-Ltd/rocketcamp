import React, { useActionState, useEffect } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast, Toaster } from 'sonner';
import { useClient } from '@/lib/useClient';
import { validateLogin } from './utils/validation';
import { getErrorMessage } from './utils/getErrorMessage';
import { FormFieldNames, type RegisterData } from './types';
import { Link, useNavigate } from 'react-router-dom';

const initialState: RegisterData = {
  email: '',
  password: '',
  errors: {},
  success: false,
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
      return { email, password, errors: { general: error.message }, success: false };
    }

    toast.success('Check email for verification');
    return { email, password, errors: {}, success: true };
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
      success: false,
    };
  }
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [state, action, pending] = useActionState<RegisterData, FormData>(formAction, initialState);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, navigate]);

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
        <Link to="/login">
          <p className="text-sm text-[#1E1E1E]">Already have an account? Sign in</p>
        </Link>
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

export default RegisterPage;

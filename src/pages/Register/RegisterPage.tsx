import React, { useActionState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast, Toaster } from 'sonner';

import { useClient } from '@/lib/useClient';
import { validateLogin } from './utils/validation';
import { getErrorMessage } from './utils/getErrorMessage';
import { FormFieldNames, type RegisterData } from './types';
import { RoutePath, AppRoutes } from '@/app/router/config';
import { useAuth } from '@/app/hooks/useAuth';

const initialState: RegisterData = {
  email: '',
  password: '',
  errors: {},
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const supabase = useClient();

  const formAction = async (_: RegisterData, formData: FormData) => {
    const email = formData.get(FormFieldNames.EMAIL) as string;
    const password = formData.get(FormFieldNames.PASSWORD) as string;

    const validationResult = await validateLogin({ email, password });

    if (validationResult.success) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { email, password, errors: { general: error.message } };
      }

      // If Supabase email confirmation is disabled, we can sign in immediately
      if (data?.user && !data.user.email_confirmed_at) {
        // Sign in with the newly created credentials
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          return { email, password, errors: { general: signInError.message } };
        }

        if (signInData?.session?.access_token) {
          // Set token and login
          localStorage.setItem('Authorization', signInData.session.access_token);
          login(signInData.session.access_token);

          // Create onboarding record
          if (signInData.user) {
            await supabase.from('user_onboarding').insert({
              user_id: signInData.user.id,
              is_completed: false,
            });
          }

          toast.success('Account created successfully');

          // Redirect to onboarding
          setTimeout(() => {
            navigate(RoutePath[AppRoutes.AUTH_ONBOARDING]);
          }, 500);
        }
      } else {
        // If email confirmation is enabled
        toast.success('Check email for verification');

        setTimeout(() => {
          navigate(RoutePath[AppRoutes.LOGIN]);
        }, 1500);
      }

      return { email, password, success: true };
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

        <Link to="/login">
          <p className="text-sm text-[#1E1E1E]">Already have an account? Sign in</p>
        </Link>
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
            'Register'
          )}
        </Button>
      </form>
    </>
  );
};

export default RegisterPage;

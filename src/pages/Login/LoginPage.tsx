import React, { useActionState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/hooks/useAuth';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { toast, Toaster } from 'sonner';

import { validateLogin } from './utils/validation';
import { useClient } from '@/lib/useClient';
import { getErrorMessage } from './utils/getErrorMessage';
import { FormFieldNames, type LoginData } from './types';
import { RoutePath, AppRoutes } from '@/app/router/config';

const initialState: LoginData = {
  email: '',
  password: '',
  errors: {},
  success: false,
};

const formAction = async (_: LoginData, formData: FormData) => {
  const email = formData.get(FormFieldNames.EMAIL) as string;
  const password = formData.get(FormFieldNames.PASSWORD) as string;
  const supabase = useClient();

  const validationResult = await validateLogin({ email, password });

  if (validationResult.success) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { email, password, errors: { general: error.message } };
    }

    if (data?.session?.access_token) {
      localStorage.setItem('Authorization', data.session.access_token);

      toast.success('Login successful');

      return { email, password, success: true };
    } else {
      return { email, password, errors: { general: 'Authentication failed' } };
    }
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
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const supabase = useClient();

  React.useEffect(() => {
    if (state.success) {
      const token = localStorage.getItem('Authorization');
      if (token) {
        login(token);

        // Check if the user needs to complete onboarding
        const checkOnboardingStatus = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            const { data, error } = await supabase
              .from('user_onboarding')
              .select('is_completed')
              .eq('user_id', user.id)
              .single();

            // If no onboarding record or onboarding not completed, redirect to onboarding
            if (error || !data?.is_completed) {
              navigate(RoutePath[AppRoutes.AUTH_ONBOARDING], { replace: true });
            } else {
              // Otherwise, navigate to originally requested page or home
              const from = location.state?.from?.pathname || '/';
              navigate(from, { replace: true });
            }
          }
        };

        checkOnboardingStatus();
      }
    }
  }, [state.success, navigate, location, login, supabase]);

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

        <Link to="/register">
          <p className="text-sm text-[#1E1E1E]">Don't have an account? Sign up</p>
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
            'Sign in'
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginPage;

import React, { useActionState, useState } from 'react';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

import { ProfileData, FormFieldNames } from '../types';

import { validateProfile } from '../utils/validation';
import { getErrorMessage } from '../utils/getErrorMessage';
import { Textarea } from '@/app/components/ui/textarea';

const initialState: ProfileData = {
  name: '',
  email: '',
  surname: '',
  message: '',
};

const MESSAGE_MAX_LENGTH = 512;

async function formAction(_: ProfileData, formData: FormData) {
  const name = formData.get(FormFieldNames.NAME) as string;
  const email = formData.get(FormFieldNames.EMAIL) as string;
  const surname = formData.get(FormFieldNames.SURNAME) as string;
  const message = formData.get(FormFieldNames.MESSAGE) as string;

  const validationResult = await validateProfile({ name, email, surname, message });

  if (validationResult.success) {
    // @todo: здесь запрос на бэк и редирект на страницу входа

    return { email, name, surname, message };
  } else {
    const errorMessages: { [key: string]: string } = {};

    validationResult.errors?.forEach(error => {
      errorMessages[error.fieldName] = getErrorMessage(error.code);
    });

    return {
      email,
      name,
      surname,
      message,
      errors: errorMessages,
    };
  }
}

export const UpdateProfile: React.FC = () => {
  const [state, action, pending] = useActionState<ProfileData, FormData>(formAction, initialState);
  const [messageLength, setMessageLength] = useState(state.message?.length || 0);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MESSAGE_MAX_LENGTH) {
      setMessageLength(text.length);
    }
  };

  return (
    <form
      action={action}
      className="w-full max-w-[90%] rounded-[2px] border border-[#D9D9D9] p-4 shadow-md sm:w-80 sm:max-w-none sm:p-6"
    >
      <label className="mb-3 flex flex-col gap-1 sm:mb-1 sm:gap-2">
        <p className="text-base text-[#1E1E1E]">Name</p>
        <Input
          name={FormFieldNames.NAME}
          type="text"
          placeholder="Name"
          className="w-full"
          defaultValue={state.name}
          autoComplete="given-name"
        />
        {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>}
      </label>

      <label className="mb-3 flex flex-col gap-1 sm:mb-1 sm:gap-2">
        <p className="text-base text-[#1E1E1E]">Surname</p>
        <Input
          name={FormFieldNames.SURNAME}
          type="text"
          placeholder="Surname"
          className="w-full"
          defaultValue={state.surname}
          autoComplete="family-name"
        />
        {state.errors?.surname && <p className="text-sm text-red-500">{state.errors.surname}</p>}
      </label>

      <label className="mb-3 flex flex-col gap-1 sm:mb-1 sm:gap-2">
        <p className="text-base text-[#1E1E1E]">Email</p>
        <Input
          name={FormFieldNames.EMAIL}
          type="email"
          placeholder="Email"
          className="w-full"
          defaultValue={state.email}
          autoComplete="email"
        />
        {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
      </label>

      <label className="mb-3 flex flex-col gap-1 sm:mb-1 sm:gap-2">
        <p className="text-base text-[#1E1E1E]">Message</p>
        <div className="relative">
          <Textarea
            name={FormFieldNames.MESSAGE}
            placeholder="Message"
            className="w-full"
            defaultValue={state.message}
            autoComplete="off"
            maxLength={MESSAGE_MAX_LENGTH}
            onChange={handleMessageChange}
          />
          <div className="mt-1 text-right text-xs text-gray-500">
            {messageLength}/{MESSAGE_MAX_LENGTH}
          </div>
        </div>
        {state.errors?.message && <p className="text-sm text-red-500">{state.errors.message}</p>}
      </label>

      {state.errors?.general && <p className="mb-4 text-sm text-red-500">{state.errors.general}</p>}

      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={pending}
      >
        Submit
      </Button>
    </form>
  );
};

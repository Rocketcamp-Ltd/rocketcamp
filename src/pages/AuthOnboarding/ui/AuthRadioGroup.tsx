import React from 'react';
import type { ComponentProps } from '../types';
import { RadioGroup } from '@/app/components/ui/radio-group';

interface RadioGroupComponentProps {
  component: ComponentProps;
  value: string;
  onValueChange: (value: string) => void;
  error: string;
}

export const RadioGroupComponent: React.FC<RadioGroupComponentProps> = ({
  component,
  value,
  onValueChange,
  error
}) => {
  const options = component.items?.map(item => ({
    value: item.name,
    label: item.name
  })) || [];

  return (
    <div className="w-full space-y-2">
      <RadioGroup
        options={options}
        defaultValue={value}
        onChange={onValueChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

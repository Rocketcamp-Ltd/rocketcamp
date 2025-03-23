import React from 'react';
import type { ComponentProps } from '../types';
import { ChipsList } from '@/app/components/ui/chips-list';

interface ChipsListComponentProps {
  component: ComponentProps;
  selectedValues: (string | number)[];
  onSelectionChange: (selectedOptions: (string | number)[]) => void;
  error: string;
}

export const ChipsListComponent: React.FC<ChipsListComponentProps> = ({
  component,
  selectedValues,
  onSelectionChange,
  error,
}) => {
  const options =
    component.items?.map(item => ({
      id: item.id,
      label: item.name,
    })) || [];

  return (
    <div className="w-full space-y-2">
      <ChipsList
        options={options}
        defaultSelected={selectedValues}
        onChange={onSelectionChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

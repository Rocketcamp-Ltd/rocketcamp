import React, { useState } from 'react';
import { SquareCheckBig, Square } from 'lucide-react';

interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  options: Option[];
  onSelectionChange?: (selectedOptions: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onSelectionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (optionId: string) => {
    const updatedSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];

    setSelectedOptions(updatedSelection);

    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option.id);

        return (
          <div
            key={option.id}
            className="flex items-center p-3 rounded-md bg-gray-100 border border-gray-200 cursor-pointer"
            onClick={() => handleCheckboxChange(option.id)}
          >
            <div className="flex-grow font-semibold">{option.label}</div>
            {isSelected ? (
              <SquareCheckBig className="h-6 w-6 text-blue-600" />
            ) : (
              <Square className="h-6 w-6 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

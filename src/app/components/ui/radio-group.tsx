import React, { useState } from 'react';
import { CircleCheck } from 'lucide-react';

interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  options: RadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const RadioGroup: React.FC<Props> = ({ options, defaultValue = '', onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {options.map(option => (
        <div
          key={option.value}
          className={`flex cursor-pointer items-center justify-between rounded-md p-4 ${selectedValue === option.value ? 'border border-blue-200 bg-blue-50' : 'border border-gray-200 bg-gray-50'} `}
          onClick={() => handleSelect(option.value)}
        >
          <span className="text-gray-700">{option.label}</span>
          {selectedValue === option.value && (
            <CircleCheck
              className="text-blue-500"
              size={20}
            />
          )}
        </div>
      ))}
    </div>
  );
};

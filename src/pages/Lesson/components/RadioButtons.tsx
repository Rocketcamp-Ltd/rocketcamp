import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface RadioButtonsProps {
  items: {
    id: number;
    label: string;
  }[];
  onSelect: () => void;
}

export const RadioButtons: React.FC<RadioButtonsProps> = ({ items, onSelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleChange = (id: number) => {
    setSelectedId(id);
    setTimeout(() => {
      onSelect();
    }, 300);
  };

  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-4">
      <div className="flex flex-col space-y-3">
        {items.map(item => (
          <label
            key={item.id}
            className={cn(
              "flex cursor-pointer items-center rounded-md p-2 transition-all duration-300",
              {
                "hover:bg-gray-200": selectedId !== item.id
              }
            )}
          >
            <div className="relative mr-3 flex h-5 w-5 items-center justify-center">
              <input
                type="radio"
                className="peer absolute opacity-0"
                name="radio-options"
                value={item.id}
                checked={selectedId === item.id}
                onChange={() => handleChange(item.id)}
                disabled={selectedId !== null}
              />
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 transition-all peer-checked:border-2 peer-checked:border-black"></div>
              <div className="absolute h-2.5 w-2.5 scale-0 rounded-full bg-black transition-transform peer-checked:scale-100"></div>
            </div>
            <span className={cn("text-base", {
              "font-medium": selectedId === item.id
            })}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
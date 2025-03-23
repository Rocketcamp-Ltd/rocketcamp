import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChipOption {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
}

interface ChipsListProps {
  options: ChipOption[];
  multiSelect?: boolean;
  defaultSelected?: (string | number)[];
  onChange?: (selectedIds: (string | number)[]) => void;
}

export const ChipsList: React.FC<ChipsListProps> = ({
  options,
  multiSelect = true,
  defaultSelected = [],
  onChange,
}) => {
  const [selectedChips, setSelectedChips] = useState<(string | number)[]>(defaultSelected);

  const handleChipClick = (id: string | number) => {
    let newSelected: (string | number)[];

    if (multiSelect) {
      if (selectedChips.includes(id)) {
        newSelected = selectedChips.filter(chipId => chipId !== id);
      } else {
        newSelected = [...selectedChips, id];
      }
    } else {
      newSelected = selectedChips.includes(id) ? [] : [id];
    }

    setSelectedChips(newSelected);

    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => {
        const isSelected = selectedChips.includes(option.id);

        return (
          <div
            key={option.id}
            onClick={() => handleChipClick(option.id)}
            className={cn(`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors`, {
              'bg-black text-white': isSelected,
              'bg-gray-100 text-gray-700 hover:bg-gray-200': !isSelected,
            })}
          >
            {isSelected && <Check size={16} />}
            {option.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
          </div>
        );
      })}
    </div>
  );
};

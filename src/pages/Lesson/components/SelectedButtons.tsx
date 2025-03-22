import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SelectedButtonsProps {
  items: {
    id: number;
    label: string;
  }[];
  onSelect: () => void;
}

export const SelectedButtons: React.FC<SelectedButtonsProps> = ({ items, onSelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedId(id);
    setTimeout(() => {
      onSelect();
    }, 300);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(`cursor-pointer rounded-lg border-2 p-3 text-base text-[#1E1E1E] transition-all duration-300`, {
            'border-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white': selectedId === null,
            'border-black': selectedId === item.id,
            'opacity-50': selectedId !== item.id && selectedId !== null,
          })}
          disabled={!!selectedId}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import type { CourseCategory } from '@/types/courses';
import { cn } from '@/lib/utils';

interface Props {
  categories: CourseCategory[];
  filters: CourseCategory[];
  changeFilters: (category: CourseCategory) => void;
}

export const CourseFilters: React.FC<Props> = ({ categories, filters, changeFilters }) => {
  // @ts-ignore
  const [searchTerm, setSearchTerm] = useState('');
  // @ts-ignore
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedCategories = showAllCategories ? filteredCategories : filteredCategories.slice(0, 10);

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-[#49454F]">Course topics</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {displayedCategories.map(category => {
          const isSelected = !!filters.find(item => item.id === category.id);

          return (
            <button
              key={category.id}
              onClick={() => changeFilters(category)}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-[8px] p-2 text-base transition-colors duration-200',
                {
                  'bg-[#F5F5F5] text-[#757575] hover:bg-[#EEEEEE] active:bg-[#E0E0E0]': !isSelected,
                  'bg-[#050038] text-[#F5F5F5] hover:bg-[#1F1956] active:bg-[#000020]': isSelected,
                },
              )}
            >
              {isSelected && (
                <span>
                  <Check className="h-4 w-4" />
                </span>
              )}
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

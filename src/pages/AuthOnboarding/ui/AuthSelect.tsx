import type { ComponentProps } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

interface SelectComponentProps {
  component: ComponentProps;
  value: string;
  onValueChange: (value: string) => void;
  error: string;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({ component, value, onValueChange, error }) => {
  return (
    <div className="w-full space-y-2">
      {component.label && <label className="text-sm font-medium">{component.label}</label>}
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={component.placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent>
          {component.items?.map(item => (
            <SelectItem
              key={item.id}
              value={item.name}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

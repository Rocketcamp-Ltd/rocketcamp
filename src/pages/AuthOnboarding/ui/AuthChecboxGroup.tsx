import type { ComponentProps } from '../types';
import { CheckboxGroup } from '@/app/components/ui/checkbox-group';

interface CheckboxGroupComponentProps {
  component: ComponentProps;
  onSelectionChange: (selectedOptions: string[]) => void;
  error: string;
}

export const CheckboxGroupComponent: React.FC<CheckboxGroupComponentProps> = ({ component, onSelectionChange, error }) => {
  const options = component.items?.map(item => ({
    id: item.id.toString(),
    label: item.name
  })) || [];

  return (
    <div className="w-full space-y-2">
      <CheckboxGroup
        options={options}
        onSelectionChange={onSelectionChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

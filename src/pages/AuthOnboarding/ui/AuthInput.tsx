import { Input } from '@/app/components/ui/input';
import type { ComponentProps } from '../types';

interface InputComponentProps {
  component: ComponentProps;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export const InputComponent: React.FC<InputComponentProps> = ({ component, value, onChange, error }) => {
  return (
    <div className="w-full space-y-2">
      {component.label && <label className="text-sm font-medium">{component.label}</label>}
      <Input
        placeholder={component.placeholder || ''}
        value={value}
        onChange={onChange}
        className={error ? 'border-red-500' : ''}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

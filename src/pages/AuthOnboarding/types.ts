export interface ComponentProps {
  type: string;
  placeholder?: string;
  pattern?: string | null;
  label?: string;
  items?: ComponentItem[];
}

interface ComponentItem {
  id: number;
  name: string;
}

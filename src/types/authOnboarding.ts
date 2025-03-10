export interface AuthOnboarding {
  id: number;
  title: string;
  text: string; // html
  button: {
    type: 'primary' | 'secondary';
    label: string;
    action: 'next' | 'finish';
  };
  components: AuthOnboardingComponent[];
}

interface ComponentWithItems {
  items: {
    id: number;
    name: string;
  }[];
}

interface AuthOnboardingSelect extends ComponentWithItems {
  type: 'select';
  placeholder: string;
  label: string;
}

interface AuthOnboardingInput {
  type: 'input';
  placeholder: string;
  pattern: string | null;
  label: string;
}

interface AuthOnboardingCheckboxGroup extends ComponentWithItems {
  type: 'checkboxGroup';
}

interface AuthOnboardingRadioGroup extends ComponentWithItems {
  type: 'radioGroup';
}

interface AuthOnboardingChips extends ComponentWithItems {
  type: 'chips';
}

type AuthOnboardingComponent =
  | AuthOnboardingSelect
  | AuthOnboardingInput
  | AuthOnboardingCheckboxGroup
  | AuthOnboardingRadioGroup
  | AuthOnboardingChips;

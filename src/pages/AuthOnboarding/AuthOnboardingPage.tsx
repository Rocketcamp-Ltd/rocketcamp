import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTrackProgress } from './hooks/useTrackProgress';

import { Button } from '@/app/components/ui/button';

import { InputComponent } from './ui/AuthInput';
import { SelectComponent } from './ui/AuthSelect';
import { CheckboxGroupComponent } from './ui/AuthChecboxGroup';
import { RadioGroupComponent } from './ui/AuthRadioGroup';
import { ChipsListComponent } from './ui/AuthChipsList';

import mockOnb from './mock';

interface StepData {
  id: number;
  data: {
    value: string | number | string[] | number[];
  };
}

const AuthOnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const [onboarding, setOnboarding] = useState(mockOnb);
  const [currentOnboarding, setCurrentOnboarding] = useState(onboarding[0]);
  const [inputValue, setInputValue] = useState('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);
  const [chipsValues, setChipsValues] = useState<(string | number)[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  const [error, setError] = useState('');

  const { currentStep, setCurrentStep, trackProgress } = useTrackProgress({ onboarding });

  useEffect(() => {
    const savedData = stepsData.find(item => item.id === currentOnboarding.id);

    if (savedData) {
      if (Array.isArray(savedData.data.value)) {
        if (currentOnboarding.components[0]?.type === 'chips') {
          setChipsValues(savedData.data.value as (string | number)[]);
        } else {
          setMultipleValues(savedData.data.value as string[]);
        }
        setIsValid(true);
      } else {
        setInputValue(savedData.data.value as string);
        validateInput(savedData.data.value as string);
      }
    } else {
      setInputValue('');
      setMultipleValues([]);
      setChipsValues([]);
      setIsValid(currentOnboarding.components.length === 0);
    }
    setError('');
  }, [currentStep, currentOnboarding.id]);

  const validateInput = (value: string) => {
    if (!currentOnboarding.components.length) {
      setIsValid(true);
      return true;
    }

    const component = currentOnboarding.components[0];

    if (component.type === 'input' || component.type === 'select' || component.type === 'radioGroup') {
      if (!value.trim()) {
        setError('This field is required');
        setIsValid(false);
        return false;
      }

      if (component.type === 'input' && component.pattern && !new RegExp(component.pattern).test(value)) {
        setError('Invalid format');
        setIsValid(false);
        return false;
      }

      setError('');
      setIsValid(true);
      return true;
    }

    setIsValid(true);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };

  const handleSelectChange = (value: string) => {
    setInputValue(value);
    validateInput(value);
  };

  const handleRadioChange = (value: string) => {
    setInputValue(value);
    validateInput(value);
  };

  const handleCheckboxGroupChange = (selectedOptions: string[]) => {
    setMultipleValues(selectedOptions);
    setIsValid(selectedOptions.length > 0);
  };

  const handleChipsChange = (selectedChips: (string | number)[]) => {
    setChipsValues(selectedChips);
    setIsValid(selectedChips.length > 0);
  };

  const handleNext = () => {
    if (currentStep < onboarding.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCurrentOnboarding(onboarding[nextStep]);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    console.log('Collected data:', stepsData);
    navigate('/');
  };

  const handleCheckboxGroupSubmit = () => {
    if (multipleValues.length === 0) {
      setError('Please select at least one option');
      return false;
    }

    const newStepData: StepData = {
      id: currentOnboarding.id,
      data: {
        value: multipleValues,
      },
    };

    updateStepData(newStepData);
    return true;
  };

  const handleChipsSubmit = () => {
    if (chipsValues.length === 0) {
      setError('Please select at least one option');
      return false;
    }

    const newStepData: StepData = {
      id: currentOnboarding.id,
      data: {
        value: chipsValues,
      },
    };

    updateStepData(newStepData);
    return true;
  };

  const handleInputOrSelectSubmit = () => {
    if (!validateInput(inputValue)) {
      return false;
    }

    const newStepData: StepData = {
      id: currentOnboarding.id,
      data: {
        value: inputValue,
      },
    };

    updateStepData(newStepData);
    return true;
  };

  const updateStepData = (newStepData: StepData) => {
    setStepsData(prevData => {
      const existingIndex = prevData.findIndex(item => item.id === currentOnboarding.id);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newStepData;
        return updatedData;
      } else {
        return [...prevData, newStepData];
      }
    });
  };

  const handleSubmit = () => {
    const component = currentOnboarding.components.length > 0 ? currentOnboarding.components[0] : null;
    let isSubmitValid = true;

    if (component) {
      if (component.type === 'checkboxGroup') {
        isSubmitValid = handleCheckboxGroupSubmit();
      } else if (component.type === 'chips') {
        isSubmitValid = handleChipsSubmit();
      } else if (component.type === 'input' || component.type === 'select' || component.type === 'radioGroup') {
        isSubmitValid = handleInputOrSelectSubmit();
      }
    }

    if (isSubmitValid) {
      if (currentOnboarding.button.action === 'next') {
        handleNext();
        trackProgress();
      } else {
        handleFinish();
      }
    }
  };

  const renderComponent = () => {
    if (!currentOnboarding.components.length) return null;

    const component = currentOnboarding.components[0];

    if (component.type === 'input') {
      return (
        <InputComponent
          component={component}
          value={inputValue}
          onChange={handleInputChange}
          error={error}
        />
      );
    }

    if (component.type === 'select' && component.items) {
      return (
        <SelectComponent
          component={component}
          value={inputValue}
          onValueChange={handleSelectChange}
          error={error}
        />
      );
    }

    if (component.type === 'radioGroup' && component.items) {
      return (
        <RadioGroupComponent
          component={component}
          value={inputValue}
          onValueChange={handleRadioChange}
          error={error}
        />
      );
    }

    if (component.type === 'checkboxGroup' && component.items) {
      return (
        <CheckboxGroupComponent
          component={component}
          onSelectionChange={handleCheckboxGroupChange}
          error={error}
        />
      );
    }

    if (component.type === 'chips' && component.items) {
      return (
        <ChipsListComponent
          component={component}
          selectedValues={chipsValues}
          onSelectionChange={handleChipsChange}
          error={error}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="mx-auto flex w-full max-w-[800px] flex-col items-start space-y-6">
        <h1 className="text-2xl font-bold">{currentOnboarding.title}</h1>

        {currentOnboarding.text && (
          <div
            className="text-left text-base"
            dangerouslySetInnerHTML={{ __html: currentOnboarding.text }}
          />
        )}

        {renderComponent()}

        {currentOnboarding.button && (
          <Button
            variant={currentOnboarding.button?.type}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {currentOnboarding.button.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthOnboardingPage;

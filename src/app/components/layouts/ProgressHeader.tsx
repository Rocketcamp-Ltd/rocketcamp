import React from 'react';

interface Props {
  hasBack?: boolean;
}

export const ProgressHeader: React.FC<Props> = (props) => {
  const { hasBack = true, } = props;

  return (
    <header>

    </header>
  );
};

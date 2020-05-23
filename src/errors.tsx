import styled from '@emotion/styled';
import React from 'react';
import Button from './Button';

const ErrorOuter = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  & > *+* { margin-top: 20px; }
`;

export const ErrorBox: React.FC<
  {
    text: string,
    error?: any,
    retry: () => void,
  }> = ({ text, error, retry }) =>
  <ErrorOuter>
    <div>{text}</div>
    {error && <div>{error.toString()}</div>}
    <div>
      <Button onClick={retry}>
        Nochmals versuchen
      </Button>
    </div>
  </ErrorOuter>


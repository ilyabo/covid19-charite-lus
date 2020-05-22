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

export const ErrorBox: React.FC<{ text: string, retry: () => void }> = ({ text, retry }) =>
  <ErrorOuter>
    <div>{text}</div>
    <div>
      <Button onClick={retry}>
        Nochmals versuchen
      </Button>
    </div>
  </ErrorOuter>


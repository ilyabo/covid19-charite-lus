import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const primaryColor = '#479675';
const primaryColorLighter = '#54b48d';

interface ButtonStyleProps {
  disabled?: boolean;
  large?: boolean
}

export const getButtonStyles = ({ large, disabled }: ButtonStyleProps) =>
  `
    ${large 
    ? `
      font-size: large;
      padding: 10px 20px;
    `
    : `
      font-size: small;
      padding: 5px 10px;
    `
    }
    border-radius: 4px;
    cursor: pointer;
    color: white;
    ${disabled 
    ? `
    background-color: #999;
    `
    :`
    background-color: ${primaryColor};
    transition: background-color 0.2s;
    &:hover {
      background-color: ${primaryColorLighter};
    }
    `}
  `;

export const ButtonLink = styled(Link)<ButtonStyleProps>(getButtonStyles);
const Button = styled.button<ButtonStyleProps>(getButtonStyles);

export default Button;

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { primaryColor, primaryColorLighter } from './colors';

interface ButtonStyleProps {
  disabled?: boolean;
  large?: boolean
}

export const getButtonStyles = ({ large, disabled }: ButtonStyleProps) =>
  `
    ${large 
    ? `
      font-size: large;
      padding: 10px 30px;
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

export const ButtonLink = styled(Link)<ButtonStyleProps>(
  getButtonStyles,
  `
    color: white !important;
    text-decoration: none;
  `
);
const Button = styled.button<ButtonStyleProps>(getButtonStyles);

export default Button;

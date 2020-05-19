import styled from '@emotion/styled';

const primaryColor = '#479675';
const primaryColorLighter = '#54b48d';

const Button = styled.a<
  {
    disabled?: boolean;
    large?: boolean
  }>(({ disabled, large }) => `
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
`);

export default Button;

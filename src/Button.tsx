import styled from '@emotion/styled';

const primaryColor = '#479675';
const primaryColorLighter = '#54b48d';

const Button = styled.a<{large?: boolean}>(({ large }) => `
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
  background-color: ${primaryColor};
  transition: background-color 0.2s;
  &:hover {
    background-color: ${primaryColorLighter};
  }
`);

export default Button;

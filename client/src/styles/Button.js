import styled from 'styled-components/macro';
import theme from './theme';
const { fontSizes } = theme;

const Button = styled.button`
  font-size: ${fontSizes.base};
  cursor: pointer;
  border: 0;
  border-radius: 0;
  transition: ${theme.transition};
  &:focus,
  &:active {
    outline: 0;
  }
`;

export default Button;

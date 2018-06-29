import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 0;
  &:focus,
  &:active {
    outline: 0;
  }
`;

export default Button;

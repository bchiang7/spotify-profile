import styled from 'styled-components';
import theme from './theme';

const A = styled.a`
  display: inline-block;
  text-decoration: none;
  color: inherit;
  transition: ${theme.transition};
`;

export default A;

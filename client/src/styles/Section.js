import styled from 'styled-components/macro';
import theme from './theme';

const Section = styled.section`
  margin: 0;

  h2 {
    margin-top: 0;
    font-size: ${theme.fontSizes.lg};
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
  }
`;

export default Section;

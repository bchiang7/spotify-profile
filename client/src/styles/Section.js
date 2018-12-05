import styled from 'styled-components/macro';
import theme from './theme';
const { fontSizes, spacing } = theme;

const Section = styled.section`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 90px 0;

  h2 {
    font-size: ${fontSizes.lg};
    font-weight: 900;
    margin: 0 0 ${spacing.lg};
  }
`;

export default Section;

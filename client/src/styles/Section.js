import styled from 'styled-components/macro';
import theme from './theme';
const { fontSizes, spacing } = theme;

const Section = styled.section`
  margin: 0 auto;
  max-width: 1400px;
  padding: 90px 0;

  h2 {
    margin-top: 0;
    font-size: ${fontSizes.xl};
    font-weight: 700;
    margin-bottom: ${spacing.lg};
  }
`;

export default Section;

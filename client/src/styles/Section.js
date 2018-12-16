import styled from 'styled-components/macro';
import media from './media';

const Section = styled.section`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 90px 0;
  ${media.tablet`
    padding: 0 0 90px;
    h2 {
      text-align: center;
    }
  `};
  ${media.phablet`
    padding: 0 0 20px;
  `};
`;

export default Section;

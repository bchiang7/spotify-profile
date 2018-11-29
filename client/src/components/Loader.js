import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { theme, mixins } from '../styles';
const { colors } = theme;

const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 100%;
`;
const dance = keyframes`
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`;
const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  width: 100px;
  min-width: 100px;
  height: 50px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  left: 0;
  right: 0;
`;
const Bar = styled.div`
  width: 10px;
  height: 5px;
  margin: 0 2px;
  background-color: ${colors.grey};

  animation-name: ${dance};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${props => props.delay || '0ms'};

  &.one {
    animation-delay: 250ms;
  }
  &.two {
    animation-delay: 715ms;
  }
  &.three {
    animation-delay: 475ms;
  }
  &.four {
    animation-delay: 25ms;
  }
  &.five {
    animation-delay: 190ms;
  }
`;

const Loader = () => (
  <Container>
    <Bars>
      <Bar delay="250ms" />
      <Bar delay="715ms" />
      <Bar delay="475ms" />
      <Bar delay="25ms" />
      <Bar delay="190ms" />
    </Bars>
  </Container>
);

export default Loader;

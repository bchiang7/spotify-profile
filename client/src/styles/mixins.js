import { css } from 'styled-components/macro';
import theme from './theme';
const { colors } = theme;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  engulf: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,

  outline: css`
    outline: 1px solid red;
  `,

  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,

  coverShadow: css`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  `,

  greenButton: css`
    display: inline-block;
    background-color: ${colors.green};
    color: ${colors.white};
    border-radius: 50px;
    padding: 12px 25px;
    margin: 20px 0;
    font-weight: 700;
    &:hover,
    &:focus {
      background-color: ${colors.offGreen};
    }
  `,
};

export default mixins;

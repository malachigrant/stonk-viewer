/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const StonkViewer = ({ symbol, price }) => {
  const Style = css`
    padding: 0.5em;
    border-radius: 0.2em;
    display: flex;
    flex-direction: column;
  `;
  return <div css={Style}>
    <div>{symbol}</div>
    <div>{price}</div>
  </div>;
};

export default StonkViewer;

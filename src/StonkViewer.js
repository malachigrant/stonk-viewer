/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const StonkViewer = ({ symbol, price, previousClose }) => {
  const Style = css`
    padding: 0.5em;
    border-radius: 0.2em;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    margin: 0.5em;
  `;
  const ColorStyle = css`
    color: ${price > previousClose ? '#00dd00' : '#dd0000'};
  `;
  return (
    <div css={Style}>
      <div>{symbol}</div>
      <div css={ColorStyle}>{`${price} (${
        Math.round((10000 * price) / previousClose - 10000) / 100
      }%)`}</div>
    </div>
  );
};

export default StonkViewer;

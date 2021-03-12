/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const roundTo = (num, precision) => {
  const mult = Math.pow(10, precision || 0)
  return Math.round(num * mult) / mult;
}

export const StonkViewer = ({ symbol, price, previousClose }) => {
  const Style = css`
    padding: 0.5em;
    border-radius: 0.2em;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    margin: 0.5em;
    min-width: 120px;
  `;
  const ColorStyle = css`
    color: ${price > previousClose ? '#00dd00' : '#dd0000'};
  `;

  const priceChange = roundTo(price - previousClose, 2);
  const pct = roundTo(priceChange/previousClose*100, 2);

  return (
    <div css={Style}>
      <div>{`${symbol} - ${price}`}</div>
      <div css={ColorStyle}>{`${priceChange} (${pct}%)`}</div>
    </div>
  );
};

export default StonkViewer;

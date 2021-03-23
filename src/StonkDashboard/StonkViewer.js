/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PropTypes } from 'prop-types';

const roundTo = (num, precision) => {
  const mult = Math.pow(10, precision || 0);
  return Math.round(num * mult) / mult;
};

const sizeMap = {
  small: {
    symbol: '1.25em',
    price: '1em',
    maxWidth: '120px'
  },
  large: {
    symbol: '2em',
    price: '2em',
    minWidth: '300px'
  }
}

export const StonkViewer = ({ symbol, price, previousClose, size = 'small' }) => {
  const Style = css`
    padding: 0.5em;
    border-radius: 0.2em;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    min-width: ${sizeMap[size].minWidth};
  `;
  const ColorStyle = css`
    color: ${price > previousClose ? '#00dd00' : '#dd0000'};
  `;
  const SymbolStyle = css`
    font-size: ${sizeMap[size].symbol};
  `;
  const PriceStyle = css`
    font-size: ${sizeMap[size].price};
  `;

  const priceChange = roundTo(price - previousClose, 2);
  const pct = roundTo((priceChange / previousClose) * 100, 2);

  return (
    <div css={Style}>
      <div css={SymbolStyle}>{`${symbol}${price ? ` - ${price}` : ''}`}</div>
      {previousClose ? (
        <div css={[ColorStyle, PriceStyle]}>{`${priceChange} (${pct}%)`}</div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

StonkViewer.propTypes = {
  symbol: PropTypes.string.isRequired,
  price: PropTypes.number,
  previousClose: PropTypes.number,
  size: PropTypes.string,
};

export default StonkViewer;

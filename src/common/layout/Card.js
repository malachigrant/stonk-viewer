//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Column from 'common/layout/Column';
import { PropTypes } from 'prop-types';

export const Card = ({ children, centered = true, padding }) => {
  const Style = css`
    border: 1px solid #ddd;
    border-radius: 0.5em;
    padding: ${padding || '1em'};
    ${centered &&
    `margin-left: auto;
    margin-right: auto;`}
  `;
  return <Column cs={Style}>{children}</Column>;
};

Card.propTypes = {
  children: PropTypes.any,
  padding: PropTypes.string,
};

export default Card;

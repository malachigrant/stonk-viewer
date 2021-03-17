//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Column from 'common/layout/Column';
import { PropTypes } from 'prop-types';

export const Card = ({ children, padding }) => {
  const Style = css`
    border: 1px solid #ddd;
    border-radius: 0.5em;
    padding: ${padding};
  `;
  return <Column cs={Style}>{children}</Column>;
};

Card.propTypes = {
  children: PropTypes.array,
  padding: PropTypes.string,
};

export default Card;

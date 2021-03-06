//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PropTypes } from 'prop-types';

export const Row = ({ children, centered, cs }) => {
  const Style = css`
    display: flex;
    flex-direction: row;
    ${centered ? 'justify-content: center' : ''};
  `;
  return <div css={[Style, cs]}>{children}</div>;
};

Row.propTypes = {
  children: PropTypes.any,
  centered: PropTypes.bool,
  cs: PropTypes.object,
};

export default Row;

//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PropTypes } from 'prop-types';

export const Column = ({ children, centered, cs }) => {
  const Style = css`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    ${centered && 'margin: 0 auto'};
  `;
  return <div css={[cs, Style]}>{children}</div>;
};

Column.propTypes = {
  children: PropTypes.any,
  centered: PropTypes.bool,
  cs: PropTypes.object,
};

export default Column;

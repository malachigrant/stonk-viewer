//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Row from 'common/layout/Row';
import { PropTypes } from 'prop-types';

export const ButtonRow = ({ children }) => {
  const Style = css`
    & > div {
      margin-right: 0.5em;
    }
    & > div:last-of-type {
      margin-right: 0;
    }
  `;
  return <Row cs={Style}>{children}</Row>;
};

ButtonRow.propTypes = {
  children: PropTypes.any,
};

export default ButtonRow;

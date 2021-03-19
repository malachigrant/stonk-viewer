//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Row from 'common/layout/Row';

export const ButtonRow = ({ children }) => {
  const Style = css`
    & > div {
      margin-right: 0.5em;
    }
    & > div:last-of-type {
      margin-right: 0;
    }
  `;
  return (
    <Row cs={Style}>
      {children}
    </Row>
  );
}

export default ButtonRow;
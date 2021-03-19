//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Row } from 'common/layout/Row';

export const Entry = ({ value, onRemove }) => {
  const Style = css`
    border: 1px solid #444;
    border-radius: 0.5em;
    padding: 0.25em;
    margin-top: 0.5em;
  `;

  return <Row cs={Style}>
    <div>{value}</div>
    <div css={css`margin-left: auto;`} onClick={onRemove}>{'X'}</div>
  </Row>;
}

export default Entry;
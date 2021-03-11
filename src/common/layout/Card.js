//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Column from 'common/layout/Column';

export const Card = ({ children }) => {
  const Style = css`
    border: 1px solid #ddd;
    border-radius: 0.5em;
  `;
  return (
    <Column cs={Style}>
      {children}
    </Column>
  );
}

export default Card;
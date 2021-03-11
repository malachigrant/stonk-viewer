//* @jsx jsx */
import { jsx, css } from '@emotion/core';

export const Row = ({ children, centered }) => {
  const Style = css`
    display: flex;
    flex-direction: row;
    ${centered ? 'justify-content: center' : ''};
  `;
  return (
    <div css={Style}>
      {children}
    </div>
  );
}

export default Row;
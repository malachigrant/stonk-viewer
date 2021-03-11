//* @jsx jsx */
import { jsx, css } from '@emotion/core';

export const Column = ({ children, centered, cs }) => {
  const Style = css`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    ${centered && 'justify-content: center'};
  `;
  return (
    <div css={[ cs, Style ]}>
      {children}
    </div>
  );
}

export default Column;
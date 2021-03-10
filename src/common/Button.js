/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const Button = ({ text, onClick }) => {
  const Style = css`
    padding: 1em;
    border-radius: 0.2em;
    border: 1px solid #ddd;
    width: 150px;
    height: 40px;
    text-align: center;
  `;
  return (
    <div css={Style} onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default Button;

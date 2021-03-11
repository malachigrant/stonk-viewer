/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const Button = ({ text, onClick }) => {
  const Style = css`
    padding: 0.5em 0.25em;
    margin: 0.5em;
    border-radius: 0.2em;
    border: 1px solid #ddd;
    width: 150px;
    text-align: center;
    font-family: Arial;
    &:hover {
      cursor: pointer;
    }
  `;
  return (
    <div css={Style} onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default Button;

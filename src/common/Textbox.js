/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const Textbox = ({ value, onChanged }) => {
  const Style = css`
    padding: 1em;
    border-radius: 0.2em;
    border: 1px solid #ddd;
    width: 250px;
  `;
  return (
    <input
      type="text"
      css={Style}
      value={value || ''}
      onChange={(e) => {
        onChanged(e.target);
      }}
    ></input>
  );
};

export default Textbox;

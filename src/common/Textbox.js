/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PropTypes } from 'prop-types';

export const Textbox = ({ value, onChanged, onSubmit }) => {
  const Style = css`
    padding: 0.5em 0.25em;
    margin: 0.5em;
    border-radius: 0.2em;
    border: 1px solid #ddd;
    font-size: 1em;
    width: 250px;
  `;
  return (
    <input
      type="text"
      css={Style}
      value={value || ''}
      onChange={(e) => {
        onChanged(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSubmit();
      }}
    ></input>
  );
};

Textbox.propTypes = {
  value: PropTypes.string,
  onChanged: PropTypes.function,
  onSubmit: PropTypes.function,
};

export default Textbox;

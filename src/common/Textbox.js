/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PropTypes } from 'prop-types';

export const Textbox = ({ value, required, label, onChange, onSubmit, inputProcessor = (input) => input, ...rest }) => {
  const Style = css`
    padding: 0.5em 0.25em;
    ${label && 'margin-top: 0.5em;'}
    border-radius: 0.5em;
    border: 1px solid #ddd;
    font-size: 1em;
    width: 250px;
    margin-bottom: 0.5em;
  `;

  const LabelStyle = css`
    ${required && `&:after {
      content: '*';
      color: #f00;
    }`}`;
  const textBox = (
    <input
      type="text"
      css={Style}
      value={value || ''}
      onChange={(e) => {
        onChange && onChange(inputProcessor(e.target.value));
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onSubmit) onSubmit();
      }}
      {...rest}
    ></input>
  );
  return label ? (
    <div>
      <div css={LabelStyle}>{label}</div>
      {textBox}
    </div>) : textBox;
};

Textbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  inputProcessor: PropTypes.func,
};

export default Textbox;

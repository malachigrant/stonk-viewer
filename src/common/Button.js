/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PropTypes } from 'prop-types';
import { colors } from 'common/styles';

const bgColorMap = {
  confirm: {
    main: colors.green,
    hover: colors.lightGreen,
    text: colors.white,
  },
  cancel: {
    main: colors.red,
    hover: colors.lightRed,
    text: colors.white,
  },
  default: {
    main: colors.blue,
    hover: colors.lightBlue,
    text: colors.white
  }
}

export const Button = ({ text, type, onClick }) => {
  const styleColor = bgColorMap[type] || bgColorMap.default;
  const Style = css`
    padding: 0.5em 0.25em;
    border-radius: 1em;
    border: 1px solid #ddd;
    margin-top: 1em;
    width: 150px;
    text-align: center;
    font-family: Arial;
    background-color: ${styleColor.main};
    color: ${styleColor.text};
    &:hover {
      background-color: ${styleColor.hover};
      cursor: pointer;
    }
  `;
  return (
    <div css={Style} onClick={() => onClick()}>
      {text}
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;

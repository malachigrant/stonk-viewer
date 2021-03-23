//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '../common/Button';

export const AppBarButton = ({ cs, ...rest }) => {
  const OverrideStyle = css`
    border-radius: 0;
    border-width: 0;
    margin: 0;
    width: auto;
    padding: 0.5em 1em;
  `;
  return <Button cs={[OverrideStyle, cs]} {...rest} />;
};

export default AppBarButton;

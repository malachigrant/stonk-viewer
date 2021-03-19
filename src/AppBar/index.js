//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Row from 'common/layout/Row';
import { AppBarButton } from './AppBarButton';
import { useHistory } from 'react-router-dom';

export const AppBar = () => {
  const HomeStyle = css`
    margin-right: auto;
  `;
  const history = useHistory();

  return (
    <Row>
      <AppBarButton
        css={HomeStyle}
        text={'Home'}
        onClick={() => history.push('/')}
      />
    </Row>
  );
};

export default AppBar;

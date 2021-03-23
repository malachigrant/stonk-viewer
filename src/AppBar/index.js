//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Row from 'common/layout/Row';
import { AppBarButton } from './AppBarButton';
import { useHistory } from 'react-router-dom';

export const AppBar = () => {
  const Left = css`
    margin-right: auto;
  `;
  const Right = css`
    margin-left: auto;
  `;
  const history = useHistory();

  return (
    <Row>
      <AppBarButton
        cs={Left}
        text={'Home'}
        onClick={() => history.push('/')}
      />
      <AppBarButton
        cs={Right}
        text={'Settings'}
        onClick={() => history.push('/settings')}
      />
    </Row>
  );
};

export default AppBar;

//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { StonkDashboard } from 'StonkDashboard';
import Column from 'common/layout/Column';
import Button from 'common/Button';
import { useHistory } from 'react-router-dom';

export const DashboardPage = () => {
  const Style = css`
    max-width: 80vw;
  `;

  const { dashboardName } = useParams();
  const history = useHistory();

  const redirect = (path) => {
    history.push(path);
  };

  return (
    <Column cs={Style} centered>
      <Button
        text="Edit Dashboard"
        onClick={() => redirect(`/dashboard/${dashboardName}/edit`)}
      />
      <StonkDashboard name={dashboardName} />
    </Column>
  );
};

export default DashboardPage;

//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { StonkDashboard } from 'StonkDashboard';
import Column from 'common/layout/Column';

export const DashboardPage = () => {
  const Style = css`
    max-width: 80vw;
  `;

  const { dashboardName } = useParams();

  return (
    <Column cs={Style} centered>
      <StonkDashboard name={dashboardName} />
    </Column>
  );
};

export default DashboardPage;

//* @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Textbox from 'common/Textbox';
import Button from 'common/Button';
import Card from 'common/layout/Card';
import { Redirect } from 'react-router-dom';

export const HomePage = () => {
  const [dashboardName, setDashboardName] = useState('');
  const [redirect, setRedirect] = useState(null);

  return (
    <Card>
      <Textbox
        label={'Load Dashboard'}
        hint={'Dashboard Name'}
        value={dashboardName}
        onChange={setDashboardName}
        onSubmit={() => {
          setRedirect(`/dashboard/${dashboardName}`);
        }}
      />
      <Button
        text={'Create Dashboard'}
        onClick={() => setRedirect('/dashboard/create')}
      />
      {redirect && <Redirect to={redirect} />}
    </Card>
  );
};

export default HomePage;

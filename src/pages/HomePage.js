//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import Textbox from 'common/Textbox';
import { Redirect } from 'react-router-dom';

export const HomePage = () => {
  const Style = css`
    margin: 1em auto 0 auto;
    padding: 1em;
  `;
  const [dashboardName, setDashboardName] = useState('');
  const [redirect, setRedirect] = useState(null);

  return (
    <div css={Style}>
      <Textbox
        value={dashboardName}
        onChanged={setDashboardName}
        onSubmit={() => {
          setRedirect(`/dashboard/${dashboardName}`);
        }}
      />
      {redirect && <Redirect to={redirect} />}
    </div>
  );
};

export default HomePage;

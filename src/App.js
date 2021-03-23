/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from 'pages/DashboardPage';
import HomePage from 'pages/HomePage';
import CreateDashboardPage from 'pages/CreateDashboardPage';
import Column from 'common/layout/Column';
import AppBar from 'AppBar';
import { SettingsPage } from 'pages/SettingsPage';

export const App = () => {
  const Title = css`
    font-size: 3em;
    text-align: center;
    font-family: Arial;
  `;

  return (
    <Router>
      <Column centered>
        <AppBar />
        <div css={Title}>Stonk Monitor</div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/dashboard/create">
            <CreateDashboardPage />
          </Route>
          <Route path={'/dashboard/:dashboardName/edit'}>
            <CreateDashboardPage />
          </Route>
          <Route path="/dashboard/:dashboardName">
            <DashboardPage />
          </Route>
        </Switch>
      </Column>
    </Router>
  );
};

export default App;

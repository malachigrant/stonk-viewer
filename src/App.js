/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from 'pages/DashboardPage';
import HomePage from 'pages/HomePage';
import Column from 'common/layout/Column';

export const App = () => {
  const Title = css`
    font-size: 3em;
    text-align: center;
    font-family: Arial;
  `;

  return (
    <Router>
      <Column centered>
        <div css={Title}>Stonk Monitor</div>
        <Switch>
          <Route exact path="/">
            <HomePage />
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

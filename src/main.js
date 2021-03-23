/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import ReactDOM from 'react-dom';

import App from 'App';
import GlobalStateProvider from 'GlobalState';

const GlobalStyle = css`
  * {
    font-family: Arial;
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
  }
`;

ReactDOM.render(
  <GlobalStateProvider>
    <Global styles={GlobalStyle} />
    <App />
  </GlobalStateProvider>,
  document.getElementById('root')
);

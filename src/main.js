/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import ReactDOM from 'react-dom';
import React from 'react';

import App from 'App';

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
  <React.Fragment>
    <Global styles={GlobalStyle} />
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

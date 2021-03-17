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
`;

ReactDOM.render(<><Global styles={GlobalStyle} /><App /></>, document.getElementById('root'));

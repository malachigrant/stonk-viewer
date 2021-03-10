/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import StonkList from 'StonkList';

export const App = () => {
  const Style = css`
    margin: 1em auto 0 auto;
    padding: 1em;
    border-radius: 0.2em;
    border: 1px solid #ddd;
  `;
  return (
    <div css={Style}>
      <StonkList />
    </div>
  );
};

export default App;

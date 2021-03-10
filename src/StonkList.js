/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Textbox from 'common/Textbox';
import { useState } from 'react';
import { addTicker } from 'StonkManager';

export const StonkList = () => {
  const [symbol, setSymbol] = useState('');
  const Style = css`
    margin: 1em auto 0 auto;
    padding: 1em 2em;
    border-radius: 0.2em;
    &:hover {
      background-color: #000000;
      color: #ffffff;
    }
  `;
  const addStonk = (symbol) => {
    addTicker(symbol, (data) => {
      console.log(data);
    });
  };
  return (
    <div>
      <Textbox value={symbol} onChanged={setSymbol} />
      <Button text="Add" onClick={() => addStonk(symbol)} />
    </div>
  );
};

export default StonkList;

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Textbox from 'common/Textbox';
import Button from 'common/Button';
import { useState, useReducer } from 'react';
import { addTicker } from 'StonkManager';
import { StonkViewer } from 'StonkViewer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, [action.symbol]: [action.price]}
    default:
      throw new Error();
  }
}

export const StonkList = () => {
  const [symbol, setSymbol] = useState('');
  const [stonks, dispatch] = useReducer(reducer, {});
  
  const setStonk = (data) => {
    dispatch({type: 'set', ...data });
  }

  const ColumnStyle = css`
    margin: 1em auto 0 auto;
    padding: 1em;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
  `;
  const RowStyle = css`
    display: flex;
    flex-direction: row;
  `;
  const addStonk = (symbol) => {
    setStonk({ symbol, price: '???' });
    setSymbol('');
    addTicker(symbol, (price) => {
      setStonk({ symbol, price });
    });
  };
  console.log(stonks);
  return (
    <div css={ColumnStyle}>
      <div css={RowStyle}>
        <Textbox value={symbol} onChanged={setSymbol} />
        <Button text="Add" onClick={() => addStonk(symbol)} />
      </div>
      <div css={RowStyle}>
        {Object.keys(stonks).map((symbol, i) => {
          console.log(symbol, i);
          return (
            <StonkViewer symbol={symbol} price={stonks[symbol]} />
          );
        })}
      </div>
    </div>
  );
};

export default StonkList;

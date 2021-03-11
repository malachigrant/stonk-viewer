/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Textbox from 'common/Textbox';
import Button from 'common/Button';
import { useState, useReducer, useEffect } from 'react';
import { addTickers, loadList } from 'StonkManager';
import { StonkViewer } from 'StonkViewer';
import Row from 'common/layout/Row';
import { Card } from 'common/layout/Card';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      const index = state.findIndex((stonk) => (stonk.symbol === action.data.symbol))
      if (index > -1) {
        const returnValue = [ ...state ];
        returnValue[index] = { ...returnValue[index], ...action.data };
        return returnValue;
      } else {
        return [ ...state, { ...action.data } ];
      }
    default:
      throw new Error();
  }
};

export const StonkList = ({ name }) => {
  const [symbol, setSymbol] = useState('');
  const [stonks, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    if (name) {
      loadList(name, setStonk);
    }
  }, [name])

  const setStonk = (data) => {
    dispatch({ type: 'set', data });
  };
  
  const GridStyle = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 80vw;
    min-width: 50vw;
  `;
  const addStonk = (symbol) => {
    if (symbol.trim() === '') {
      return;
    }
    const list = symbol.toUpperCase().split(/\s*,\s*/g);
    /*addTickers(list, (data) => {
      setStonk({ ...data });
    });*/
    addTickers(list, setStonk);
    list.forEach((symbol) => {
      setStonk({ symbol, price: '' });
    });
    setSymbol('');
  };
  return (
    <Card>
      <Row centered>
        <Textbox value={symbol} onChanged={setSymbol} onSubmit={() => addStonk(symbol)} />
        <Button text="Add" onClick={() => addStonk(symbol)} />
      </Row>
      <div css={GridStyle}>
        {stonks.map((stonk, i) => {
          return (
            <StonkViewer
              symbol={stonk.symbol}
              price={stonk.price}
              previousClose={stonk.previousClose}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default StonkList;

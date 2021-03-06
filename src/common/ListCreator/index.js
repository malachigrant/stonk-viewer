//* @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Textbox from 'common/Textbox';
import Entry from './Entry';
import { PropTypes } from 'prop-types';

export const ListCreator = ({
  initialList = [],
  listChange,
  elementProcessor,
}) => {
  const [list, __setList] = useState([...initialList]);
  const [symbol, setSymbol] = useState('');

  const setList = (list) => {
    listChange(list);
    __setList(list);
  };

  const addSymbol = () => {
    setList([...list, symbol]);
    setSymbol('');
  };

  const removeSymbol = (i) => {
    const listCopy = [...list];
    listCopy.splice(i, 1);
    setList(listCopy);
  };

  return (
    <div>
      <Textbox
        label={'Add to List'}
        inputProcessor={elementProcessor}
        value={symbol}
        onChange={setSymbol}
        onSubmit={addSymbol}
      />
      <div>
        {list.map((symbol, i) => (
          <Entry key={i} value={symbol} onRemove={() => removeSymbol(i)} />
        ))}
      </div>
    </div>
  );
};

ListCreator.propTypes = {
  initialList: PropTypes.array,
  listChange: PropTypes.func,
  elementProcessor: PropTypes.func,
};

export default ListCreator;

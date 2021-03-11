//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import StonkList from 'StonkList';
import { useState } from 'react';
import Textbox from 'common/Textbox';
import Column from 'common/layout/Column';

export const StonksPage = () => {
  const Style = css`
    margin: 1em auto 0 auto;
    padding: 1em;
  `;
  const Title = css`
    font-size: 3em;
    text-align: center;
    font-family: Arial;
  `;
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  return (
    <Column centered>
    <div css={Title}>Stonk Monitor</div>
      <div css={Style}>
        <Textbox value={listName} onChanged={setListName} onSubmit={() => {
          setLists([ ...lists, listName]);
          setListName('');
        }} />
        {lists.map((listName, i) => (
          <StonkList name={listName} key={i} />
        ))}
        <StonkList />
      </div>
    </Column>
  );
}

export default StonksPage;
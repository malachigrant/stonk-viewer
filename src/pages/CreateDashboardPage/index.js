//* @jsx jsx */
import { jsx } from '@emotion/core';
import Card from 'common/layout/Card';
import Textbox from 'common/Textbox';
import Button from 'common/Button';
import ButtonRow from 'common/ButtonRow';
import React, { useState, useEffect } from 'react';
import ListCreator from 'common/ListCreator';
import { createDashboard } from 'ServerManager';
import { Redirect } from 'react-router-dom';
import { Loading } from 'common/Loading';
import { readDashboard } from 'ServerManager';
import { useParams } from 'react-router-dom';

export const CreateDashboardPage = () => {
  const { dashboardName } = useParams();

  const [name, setName] = useState('');
  const [lists, setLists] = useState([{name: 'New List'}]);
  const [redirect, setRedirect] = useState(null);
  const [loaded, setLoaded] = useState(!dashboardName)

  if (dashboardName && !name) {
    readDashboard(dashboardName, (data) => {
      setName(dashboardName);
      setLists(data.lists);
      setLoaded(true);
    })
  }

  if (!loaded) {
    return <Loading />
  }

  const textProcessor = (txt) => txt.toUpperCase();

  const updateListData = (data, i) => {
    const listsCopy = [...lists];
    listsCopy[i] = {...listsCopy[i], ...data};
    setLists(listsCopy);
  }
  const addList = () => {
    setLists([...lists, {name: ''}])
  }
  const submitDashboard = () => {
    createDashboard(name, { lists }, (e) => {
      if (e) {
        console.log(e);
        return;
      }
      setRedirect(`/dashboard/${name}`);
    })
  }
  return (
    <Card>
      <Textbox enabled={!dashboardName} label={'Name'} value={name} required onChange={setName} />
      {lists.map((listData, i) => {
        return <Card centered={false} key={i}>
          <Textbox label={'List Name'} value={listData.name} onChange={(name) => updateListData({name}, i)} />
          <ListCreator initialList={listData.symbols} elementProcessor={textProcessor} listChange={(list) => updateListData({symbols: list}, i)} />
        </Card>
      })}
      <Button text={'Add List'} onClick={addList} />
      <ButtonRow>
        <Button type={'confirm'} text={dashboardName ? 'Save' : 'Create'} onClick={submitDashboard} />
        <Button type={'cancel'} text={'Cancel'} onClick={() => setRedirect(dashboardName ? `/dashboard/${dashboardName}` : '/')} />
      </ButtonRow>
      {redirect && <Redirect to={redirect} />}
    </Card>
  );
}

export default CreateDashboardPage;
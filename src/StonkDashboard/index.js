//* @jsx jsx */
import { jsx } from '@emotion/core';
import StonkSection from 'StonkDashboard/StonkSection';
import { useEffect, useReducer, useState } from 'react';
import { loadDashboard } from 'StonkManager';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.symbol]: { ...state[action.symbol], ...action.data },
      };
    default:
      throw new Error();
  }
};

export const StonkDashboard = ({ name }) => {
  const [dashboardData, setDashboardData] = useState([]);
  const [stonkDataMap, dispatch] = useReducer(reducer, {});

  const dataChanged = (data) => {
    console.log(data);
    dispatch({ type: 'set', symbol: data.symbol, data });
  };
  useEffect(() => {
    loadDashboard(name, dataChanged, (initData) => {
      setDashboardData(initData.lists);
    });
  }, [name]);
  return dashboardData.map((data, i) => (
    <StonkSection key={i} data={data} stonkMap={stonkDataMap} />
  ));
};

export default StonkDashboard;

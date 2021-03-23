//* @jsx jsx */
import { jsx } from '@emotion/core';
import { useGlobal, convertToSetter } from 'GlobalState';
import { Card } from 'common/layout/Card';

const settings = {
  size: {
    type: 'select',
    options: [
      'small',
      'large'
    ]
  }
}

export const SettingsPage = () => {
  const globalSettings = useGlobal();
  return <Card>
    {Object.keys(settings).map((key) => {
      const settingData = settings[key];
      const currentValue = globalSettings[key];
      const setValue = globalSettings[convertToSetter(key)];
      console.log(globalSettings, setValue);
      if (settingData.type === 'select') {
        return <select onChange={(e) => setValue(e.target.value)} name={key}>
          {settingData.options.map((option, i) => {
            return <option selected={ option === currentValue } key={i} value={option}>{option}</option>;
          })}
        </select>
      }
    })}
  </Card>;
}

export default SettingsPage;
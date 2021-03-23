import { createContext, useContext, useReducer } from 'react';
import initialState from './initialState';

const GlobalStateContext = createContext(initialState);

export const convertToSetter = (name) => `set${name[0].toUpperCase()}${name.substring(1)}`;

const getActions = (dispatch) => {
	return Object.keys(initialState).reduce((acc, key) => ({
		...acc,
		[convertToSetter(key)]: (payload) => dispatch({ type: key, payload }),
	}), {});
};

const reducer = (state, action) => {
  return { ...state, [action.type]: action.payload };
}

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider
      value={{ ...state, ...getActions(dispatch) }}
      children={children}
    />
  );
}

export const useGlobal = () => {
  return useContext(GlobalStateContext);
}

export default GlobalStateProvider;
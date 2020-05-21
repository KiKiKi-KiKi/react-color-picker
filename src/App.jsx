import React, { useMemo, useReducer } from 'react';
import ColorContext from './context/color';
import reducer, { initialColorState } from './reducers/color';
import HSLSliders from './components/HSLSliders';

const rgbaStr = ({ rgb, alpha }) => {
  return `rgba(${rgb.join(',')},${alpha / 100})`;
};

export default function App() {
  const [color, dispatch] = useReducer(reducer, initialColorState);
  const rgba = useMemo(() => rgbaStr(color), [color]);

  return (
    <>
      <span>{rgba}</span>
      <ColorContext.Provider value={{ color, dispatch }}>
        <HSLSliders />
      </ColorContext.Provider>
    </>
  );
}

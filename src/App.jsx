import React, { useReducer } from 'react';
import ColorContext from './context/color';
import reducer, { initialColorState } from './reducers/color';
import RGBSliders from './components/RGBSliders';
import HSLSliders from './components/HSLSliders';
import AlphaSlider from './components/AlphaSlider';
import CurrentColor from './components/CurrentColor';

export default function App() {
  const [color, dispatch] = useReducer(reducer, initialColorState);

  return (
    <>
      <CurrentColor color={color} />
      <ColorContext.Provider value={{ color, dispatch }}>
        <RGBSliders />
        <HSLSliders />
        <AlphaSlider />
      </ColorContext.Provider>
    </>
  );
}

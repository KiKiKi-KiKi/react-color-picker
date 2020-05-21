import React, { useReducer } from 'react';
import ColorContext from './context/color';
import reducer, { initialColorState } from './reducers/color';
import CurrentColor from './components/CurrentColor';
import ColorPicker from './components/ColorPicker';
import RGBSliders from './components/RGBSliders';
import HSLSliders from './components/HSLSliders';
import AlphaSlider from './components/AlphaSlider';
import './styles/index.scss';

export default function App() {
  const [color, dispatch] = useReducer(reducer, initialColorState);

  return (
    <>
      <div className="color-picker-container">
        <CurrentColor color={color} />
        <ColorContext.Provider value={{ color, dispatch }}>
          <div className="panel">
            <ColorPicker />
          </div>
          <div className="sliders panel">
            <RGBSliders />
            <HSLSliders />
            <AlphaSlider />
          </div>
        </ColorContext.Provider>
      </div>
    </>
  );
}

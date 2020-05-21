import React from 'react';
import ColorSlider from './components/Slider';

export default function App() {
  return (
    <>
      <dl>
        <dt>H</dt>
        <dd><ColorSlider type="hue" value="0" /></dd>
        <dt>S</dt>
        <dd><ColorSlider type="saturation" value="0" /></dd>
        <dt>B</dt>
        <dd><ColorSlider type="brightness" value="0" /></dd>
      </dl>
    </>
  );
}

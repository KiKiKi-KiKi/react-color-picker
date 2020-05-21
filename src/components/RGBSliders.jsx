import React, { useContext, useCallback } from 'react';
import ColorContext from '../context/color';
import { RGB_TO_HSL } from '../reducers/color';
import { RGBSlider } from './Slider';

export default function RGBSliders() {
  const {
    color: { rgb },
    dispatch,
  } = useContext(ColorContext);
  const [r, g, b] = rgb;

  const onChange = useCallback(
    (key) => (e) => {
      const newRGB = [...rgb];
      newRGB[key] = e.target.value - 0;
      dispatch({ type: RGB_TO_HSL, rgb: newRGB });
    },
    [rgb, dispatch],
  );

  return (
    <>
      <dl className="slider">
        <dt>R</dt>
        <dd>
          <RGBSlider type="red" value={r} onChange={onChange(0)} />
        </dd>
        <dt>G</dt>
        <dd>
          <RGBSlider type="green" value={g} onChange={onChange(1)} />
        </dd>
        <dt>B</dt>
        <dd>
          <RGBSlider type="blue" value={b} onChange={onChange(2)} />
        </dd>
      </dl>
    </>
  );
}

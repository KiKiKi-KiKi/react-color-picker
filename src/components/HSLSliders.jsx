import React, { useContext, useCallback } from 'react';
import ColorContext from '../context/color';
import { HSL_TO_RGB } from '../reducers/color';
import { HSLSlider } from './Slider';

export default function HSLSliders() {
  const {
    color: { hsl },
    dispatch,
  } = useContext(ColorContext);
  const [h, s, l] = hsl;

  const onChange = useCallback(
    (key) => (e) => {
      const newHSL = [...hsl];
      newHSL[key] = e.target.value - 0;
      dispatch({ type: HSL_TO_RGB, hsl: newHSL });
    },
    [hsl, dispatch],
  );

  return (
    <>
      <dl className="slider">
        <dt>H</dt>
        <dd>
          <HSLSlider type="hue" value={h} onChange={onChange(0)} />
        </dd>
        <dt>S</dt>
        <dd>
          <HSLSlider type="saturation" value={s} onChange={onChange(1)} />
        </dd>
        <dt>L</dt>
        <dd>
          <HSLSlider type="brightness" value={l} onChange={onChange(2)} />
        </dd>
      </dl>
    </>
  );
}

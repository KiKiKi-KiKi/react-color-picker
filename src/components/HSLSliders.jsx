import React, { useContext, useCallback } from 'react';
import ColorContext from '../context/color';
import { HSL_TO_RGB } from '../reducers/color';
import Slider from './Slider';

export default function HSLSliders() {
  const {
    color: { hsl },
    dispatch,
  } = useContext(ColorContext);
  const [h, s, l] = hsl;

  const onChange = useCallback(
    (key) => (e) => {
      const newHsl = [...hsl];
      newHsl[key] = e.target.value - 0;
      dispatch({ type: HSL_TO_RGB, hsl: newHsl });
    },
    [hsl, dispatch],
  );

  return (
    <>
      <dl>
        <dt>H</dt>
        <dd>
          <Slider type="hue" value={h} onChange={onChange(0)} />
        </dd>
        <dt>S</dt>
        <dd>
          <Slider type="saturation" value={s} onChange={onChange(1)} />
        </dd>
        <dt>L</dt>
        <dd>
          <Slider type="brightness" value={l} onChange={onChange(2)} />
        </dd>
      </dl>
    </>
  );
}

import React, { useContext, useCallback } from 'react';
import ColorContext from '../context/color';
import { ALPHA } from '../reducers/color';

export default function AlphaSlider() {
  const {
    color: { alpha },
    dispatch,
  } = useContext(ColorContext);

  const onChangeHandler = useCallback(
    (e) => {
      dispatch({ type: ALPHA, alpha: e.target.value - 0 });
    },
    [dispatch],
  );

  return (
    <>
      <dl className="slider">
        <dt>Alpha</dt>
        <dd>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={alpha}
            onChange={onChangeHandler}
          />
          <span>{alpha}%</span>
        </dd>
      </dl>
    </>
  );
}

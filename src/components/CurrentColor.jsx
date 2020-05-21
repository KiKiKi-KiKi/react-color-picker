import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { fillCanvas, rgbaStr } from '../utils';

export default function CurrentColor({ color }) {
  const rgba = useMemo(() => rgbaStr(color), [color]);
  const ref = useRef(null);
  const ctx = useRef();
  const getCtx = useCallback(() => ctx.current, []);

  useEffect(() => {
    ctx.current = ref.current.getContext('2d');
  }, []);

  useEffect(() => {
    fillCanvas(getCtx())(rgba);
  }, [rgba, getCtx]);

  return (
    <>
      <div className="current-color">
        <canvas className="current-color__canvas" ref={ref}></canvas>
      </div>
      <span className="current-color__label">{rgba}</span>
    </>
  );
}

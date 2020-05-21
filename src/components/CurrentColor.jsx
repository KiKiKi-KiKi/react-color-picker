import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { fillCanvas, rgbaStr } from '../utils';
import { converter } from '../converter';

export default function CurrentColor({ color }) {
  const rgba = useMemo(() => rgbaStr(color), [color]);
  const hex = color.alpha === 100 ? converter.rgb_hex(color.rgb) : null;
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
        <canvas className="current-color__canvas canvas" ref={ref}></canvas>
      </div>
      <div className="current-color__labels">
        <span>{rgba}</span>
        <span>{hex}</span>
      </div>
    </>
  );
}

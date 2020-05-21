import React, { useRef, useEffect, useCallback, useMemo } from 'react';

const drawCanvas = (ctx) => (color) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
};

const rgbaStr = ({ rgb, alpha }) => {
  return `rgba(${rgb.join(',')},${alpha / 100})`;
};

export default function CurrentColor({ color }) {
  const rgba = useMemo(() => rgbaStr(color), [color]);
  const ref = useRef(null);
  const ctx = useRef();
  const getCtx = useCallback(() => ctx.current);

  useEffect(() => {
    ctx.current = ref.current.getContext('2d');
  }, []);

  useEffect(() => {
    drawCanvas(getCtx())(rgba);
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

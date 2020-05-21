import React, { useEffect, useRef, useCallback, useContext } from 'react';
import ColotContext from '../../context/color';
import { RGB_TO_HSL } from '../../reducers/color';
import { fillHueGradient } from '../../utils';

const InitCanvas = (canvas) => (width, height) => {
  const ctx = canvas.getContext('2d');
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  fillHueGradient(ctx);
  return ctx;
};

export default function HuePicker({ width, height }) {
  const { dispatch } = useContext(ColotContext);
  const ref = useRef(null);
  const ctx = useRef();
  const getCtx = useCallback(() => ctx.current, []);
  const isDrag = useRef(false);

  const onChangeColor = useCallback(
    (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      const imageData = getCtx().getImageData(x, y, 1, 1).data;
      const rgb = [imageData[0], imageData[1], imageData[2]];
      dispatch({ type: RGB_TO_HSL, rgb });
    },
    [dispatch, getCtx],
  );

  const mousewDownHandler = useCallback(
    (e) => {
      isDrag.current = true;
      onChangeColor(e);
    },
    [onChangeColor],
  );

  const mousewUpHandler = useCallback(() => {
    isDrag.current = false;
  }, []);

  const mouseMoveHandler = useCallback(
    (e) => {
      if (!isDrag.current) {
        return;
      }
      onChangeColor(e);
    },
    [onChangeColor],
  );

  useEffect(() => {
    const canvas = ref.current;
    ctx.current = InitCanvas(canvas)(width, height);

    canvas.addEventListener('click', onChangeColor, false);
    canvas.addEventListener('mousedown', mousewDownHandler, false);
    canvas.addEventListener('mouseup', mousewUpHandler, false);
    canvas.addEventListener('mouseleave', mousewUpHandler, false);
    canvas.addEventListener('mousemove', mouseMoveHandler, false);

    return () => {
      canvas.removeEventListener('click', onChangeColor, false);
      canvas.removeEventListener('mousedown', mousewDownHandler, false);
      canvas.removeEventListener('mouseup', mousewUpHandler, false);
      canvas.removeEventListener('mouseleave', mousewUpHandler, false);
      canvas.removeEventListener('mousemove', mouseMoveHandler, false);
    };
  }, [
    onChangeColor,
    mousewDownHandler,
    mousewUpHandler,
    mouseMoveHandler,
    width,
    height,
  ]);

  return (
    <>
      <div className="hue-grad-picker">
        <canvas ref={ref} className="hue-grad-picker__canvas"></canvas>
      </div>
    </>
  );
}

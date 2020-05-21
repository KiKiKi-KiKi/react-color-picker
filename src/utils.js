import { converter } from './converter';

export const rgbaStr = ({ rgb, alpha }) => {
  return `rgba(${rgb.join(',')},${alpha / 100})`;
}

export const fillCanvas = (ctx) => (color) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
}

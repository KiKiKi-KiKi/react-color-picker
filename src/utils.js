import { converter } from './converter';

export const rgbaStr = ({ rgb, alpha }) => {
  return `rgba(${rgb.join(',')},${alpha / 100})`;
};

export const fillCanvas = (ctx) => (color) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
};

export const fillCanvasByHue = (ctx) => (hue) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  const rgb = converter.hsl_hex([hue, 100, 50]);
  ctx.fillStyle = rgb;
  ctx.fillRect(0, 0, w, h);

  const gradwhite = ctx.createLinearGradient(0, 0, w, 0);
  gradwhite.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradwhite.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradwhite;
  ctx.fillRect(0, 0, w, h);

  const gradBlack = ctx.createLinearGradient(0, 0, 0, h);
  gradBlack.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradBlack.addColorStop(1, 'rgba(0, 0, 0, 1)');
  ctx.fillStyle = gradBlack;
  ctx.fillRect(0, 0, w, h);
};

export const fillHueGradient = (ctx) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, 'rgba(255, 0, 0, 1)');
  grad.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
  grad.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
  grad.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
  grad.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
  grad.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
  grad.addColorStop(1, 'rgba(255, 0, 0, 1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  /*
  const gradwhite = ctx.createLinearGradient(0, 0, 0, h);
  gradwhite.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradwhite.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradwhite;
  ctx.fillRect(0, 0, w, h);

  const gradBlack = ctx.createLinearGradient(0, 0, 0, h);
  gradBlack.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
  gradBlack.addColorStop(1, 'rgba(0, 0, 0, 1)');
  ctx.fillStyle = gradBlack;
  ctx.fillRect(0, 0, w, h);
  */
};

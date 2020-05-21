export const converter = {};

converter.rgb_hsl = function (rgb) {
  const [r, g, b] = rgb;
};

const getMaxMin = ({ s, l }) => {
  let max, min;
  if (l < 50) {
    max = 2.55 * (l + l * (s / 100));
    min = 2.55 * (l - l * (s / 100));
  } else {
    max = 2.55 * (l + (100 - l) * (s / 100));
    min = 2.55 * (l - (100 - l) * (s / 100));
  }
  return { max: Math.round(max), min: Math.round(min) };
};

converter.hsl_rgb = function (hsl) {
  const [h, s, l] = hsl;

  if (l === 0) {
    return [0, 0, 0];
  }
  if (l === 100) {
    return [255, 255, 255];
  }

  // 彩度 0
  if (s === 0) {
    return Array(3).fill(Math.round(255 * (l / 100)));
  }

  const { max, min } = getMaxMin({ s, l });
  const t = max - min + min;

  let r, g, b;

  if (h < 60) {
    r = max;
    g = Math.round((h / 60) * t);
    b = min;
    return [r, g, b];
  } else if (h < 120) {
    r = Math.round(((120 - h) / 60) * t);
    g = max;
    b = min;
    return [r, g, b];
  } else if (h < 180) {
    r = min;
    g = max;
    b = Math.round(((h - 120) / 60) * t);
    return [r, g, b];
  } else if (h < 240) {
    r = min;
    g = Math.round(((240 - h) / 60) * t);
    b = max;
    return [r, g, b];
  } else if (h < 300) {
    r = Math.round(((h - 240) / 60) * t);
    g = min;
    b = max;
    return [r, g, b];
  } else {
    r = max;
    g = min;
    b = Math.round(((360 - h) / 60) * t);
    return [r, g, b];
  }
};

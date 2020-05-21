export const converter = {};

const getHue = (min, max) => (r, g, b) => {
  if (min === max) {
    return 0;
  }

  const delta = max - min;
  let h;
  switch (max) {
    case r: {
      h = (g - b) / delta;
      break;
    }
    case g: {
      h = 2 + (b - r) / delta;
      break;
    }
    case b: {
      h = 4 + (r - g) / delta;
      break;
    }
    default:
      return 0;
  }

  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }

  return Math.round(h);
};

const getSaturation = (cnt, min, max) => {
  let s;
  if (min === max) {
    return 0;
  }
  if (cnt < 128) {
    s = (max - min) / (max + min);
  } else {
    s = (max - min) / (510 - max - min);
  }
  return Math.round(s * 100);
};

converter.rgb_hsl = function (rgb) {
  const [r, g, b] = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const cnt = (max + min) / 2;

  const h = getHue(min, max)(r, g, b);
  const s = getSaturation(cnt, min, max);
  const l = Math.round((cnt / 255) * 100);
  return [h, s, l];
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

converter.hsl_hex = (hsl) => {
  const rgb = converter.hsl_rgb(hsl).map((val) => {
    return `00${val.toString(16)}`.slice(-2);
  });
  return `#${rgb.join('')}`;
};

converter.rgb_hex = (rgb) => {
  const hex = rgb.map((val) => {
    return `00${val.toString(16)}`.slice(-2);
  }).join('');
  return `#${hex}`;
}

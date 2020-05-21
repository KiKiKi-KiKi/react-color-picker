import { converter } from '../converter';

export const HSL_TO_RGB = 'HSL_TO_RGB';
export const RGB_TO_HSL = 'RGB_TO_HSL';
export const ALPHA = 'ALPHA';

export const initialColorState = {
  rgb: [128, 128, 128],
  hsl: [0, 0, 50],
  alpha: 100,
};

const reducer = (state = initialColorState, actions) => {
  switch (actions.type) {
    case HSL_TO_RGB: {
      const hsl = actions.hsl;
      return { ...state, hsl, rgb: converter.hsl_rgb(hsl) };
    }
    case RGB_TO_HSL: {
      const rgb = actions.rgb;
      return { ...state, rgb, hsl: converter.rgb_hsl(rgb) };
    }
    case ALPHA: {
      return { ...state, alpha: actions.alpha };
    }
    default:
      return state;
  }
};

export default reducer;

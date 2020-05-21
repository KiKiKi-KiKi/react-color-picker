import { converter } from '../converter';

export const HSL_TO_RGB = 'HSL_TO_RGB';
export const ALPHA = 'ALPHA';

export const initialColorState = {
  rgb: [0, 0, 0],
  hsl: [0, 0, 0],
  alpha: 100,
};

const reducer = (state = initialColorState, actions) => {
  switch (actions.type) {
    case HSL_TO_RGB: {
      const hsl = actions.hsl;
      return { ...state, hsl, rgb: converter.hsl_rgb(hsl) };
    }
    case ALPHA: {
      return { ...state, alpha: actions.alpha };
    }
    default:
      return state;
  }
};

export default reducer;

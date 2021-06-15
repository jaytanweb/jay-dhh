export const size = {
  s_1: 1,
  s_2: 2,
  s_4: 4,
  s_6: 6,
  s_8: 8,
  s_10: 10,
  s_12: 12,
  s_14: 14,
  s_16: 16,
  s_18: 18,
  s_20: 20,
  s_24: 24,
  s_26: 26,
  s_28: 28,
  s_32: 32,
  s_36: 36,
  s_40: 40,
  s_48: 48,
  s_64: 64,
  s_100: 100,
  s_200: 200,
  s_400: 400,
  s_600: 600,
};

export const font = {
  h1: {
    fontWeight: size.s_600,
    fontSize: size.s_36,
    lineHeight: 52,
    letterSpaceing: 0.15,
  },
  h2: {
    fontWeight: size.s_600,
    fontSize: size.s_24,
    lineHeight: 36,
    letterSpaceing: 0.15,
  },
  h3: {
    fontWeight: size.s_600,
    fontSize: size.s_18,
    lineHeight: 24,
    letterSpaceing: 0.15,
  },
  h4: {
    fontWeight: size.s_600,
    fontSize: size.s_16,
    lineHeight: 20,
    letterSpaceing: 0.12,
  },
  sub1: {
    fontWeight: size.s_600,
    fontSize: size.s_16,
    lineHeight: 20,
    letterSpaceing: 0.12,
  },
  sub2: {
    fontWeight: size.s_600,
    fontSize: size.s_14,
    lineHeight: 20,
    letterSpaceing: 0.12,
  },
  p1: {
    fontWeight: size.s_400,
    fontSize: size.s_16,
    lineHeight: 24,
    letterSpaceing: 0.1,
  },
  p2: {
    fontWeight: size.s_400,
    fontSize: size.s_14,
    lineHeight: 20,
    letterSpaceing: 0.1,
  },
  p3: {
    fontWeight: size.s_400,
    fontSize: size.s_12,
    lineHeight: 16,
    letterSpaceing: 0.1,
  },
};

export const padding = {
  large: size.s_16,
  default: size.s_12,
  small: size.s_8,
  mini: size.s_4,
  tiny: size.s_2,
};

export const margin = {
  large: size.s_16,
  default: size.s_12,
  small: size.s_8,
  mini: size.s_4,
  tiny: size.s_2,
};

export const borderRadius = {
  large: size.s_12,
  default: size.s_8,
  small: size.s_4,
  mini: size.s_2,
};

export const boxShadow = (primary) => ({
  default: `0px ${size.s_2}px ${size.s_4}px 0px ${primary}10`,
  dark: `0px ${size.s_4}px ${size.s_8}px 0px ${primary}12`,
  darker: `0px ${size.s_8}px ${size.s_16}px 0px ${primary}16`,
  darkest: `0px ${size.s_16}px ${size.s_32}px 0px ${primary}18`,
});

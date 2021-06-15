import {
  size,
  font,
  padding,
  margin,
  borderRadius,
  boxShadow,
} from './theme.common';

const type = 'DARK';

const color = {
  primary: {
    // dark: '#345DEE',
    // default: '#376BF5',
    // light_1: '#5F83F8',
    // light_2: '#7B9AFF',
    // light_3: '#BCDFFF',
    // light_4: '#D9EDFF',
    // light_5: '#EFF8FF',

    dark: '#FF7133',
    default: '#FF7338',
    light_1: '#FF7B42',
    light_2: '#FF8B59',
    light_3: '#FF9C72',
    light_4: '#FFAF8D',
    light_5: '#FFC6AE',
  },
  gray: {
    dark: '#FFFFFF',
    default: '#FAFBFF',
    light_1: '#F6F6F9',
    light_2: '#D1D1D8',
    light_3: '#575757',
    light_4: '#828286',
    light_5: '#4E4E4E',
  },
  purple: {
    dark: '#6944FE',
    default: '#7B5AFF',
    light_1: '#8E72FF',
    light_2: '#A28BFF',
    light_3: '#BAA9FF',
    light_4: '#D7CDFF',
    light_5: '#E5DEFF',
  },
  yellow: {
    dark: '#FFA347',
    default: '#FFB62B',
    light_1: '#FFC24F',
    light_2: '#FFCA67',
    light_3: '#FFD482',
    light_4: '#FFE0A5',
    light_5: '#FFEECD',
  },
  red: {
    dark: '#E10003',
    default: '#F00003',
    light_1: '#FF2A2D',
    light_2: '#FF5658',
    light_3: '#FF787A',
    light_4: '#FFC1C1',
    light_5: '#FFD7D7',
  },
  orange: {
    dark: '#FF6421',
    default: '#FF7338',
    light_1: '#FF7B42',
    light_2: '#FF8B59',
    light_3: '#FF9C72',
    light_4: '#FFAF8D',
    light_5: '#FFC6AE',
  },
  green: {
    dark: '#27AE60',
    default: '#0DCD5E',
    light_1: '#12DB67',
    light_2: '#28DF76',
    light_3: '#44EC8B',
    light_4: '#55F498',
    light_5: '#9BF9C2',
  },
  blue: {
    light_5: '#3E4373',
    light_4: '#C1C6F5',
    light_3: '#64698F',
    light_2: '#8B8EAB',
    light_1: '#B2B4C7',
    default: '#F1F1F4',
    dark: '#F5F5F5',
  },

  state: {
    danger: '#FF2A2D',
    complete: '#12DB67',
    warn: '#FF7B42',
    process: '#FFBE43',
    info: '#376BF5',
    disabled: '#D1D1D8',
  },
  type: [
    {
      default: '#12DB67',
      light_1: '#E1FFED',
    },
    {
      default: '#FF7B42',
      light_1: '#FF7B42',
    },
    {
      default: '#8E72FF',
      light_1: '#E9E4FF',
    },
  ],
};

const system = {
  borderColor: color.gray.light_3,
};

const theme = {
  type,
  size,
  font,
  padding,
  margin,
  borderRadius,
  color,
  boxShadow: boxShadow(color.primary.default),
  genBoxShadow: boxShadow,

  ...system,
};

export default theme;

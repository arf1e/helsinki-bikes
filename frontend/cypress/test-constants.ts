import theme from '../src/common/theme';

const hexToRgb = (hex: string) => {
  hex = hex.replace('#', '');

  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);

  const rgb = [r, g, b].map((color) => parseInt(color, 16)).join(', ');
  return `rgb(${rgb})`;
};

export const ERROR_COLOR_RGB = hexToRgb(theme.errorColor);
export const ACTIVE_COLOR_RGB = hexToRgb(theme.primaryColor);

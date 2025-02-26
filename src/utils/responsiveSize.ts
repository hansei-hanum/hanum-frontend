import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants';

export const RPH = (percentage: number) => {
  return (percentage / 100) * SCREEN_HEIGHT;
};

export const RPW = (percentage: number) => {
  return (percentage / 100) * SCREEN_WIDTH;
};

import { colors } from '../data/colors';
import { IIcon } from '../interfaces';

export const getRandomColor = () => colors[Math.round(Math.random() * (colors.length - 1))];

export const getRandomIcon = (array: IIcon[]) =>
  array[Math.round(Math.random() * (array.length - 1))];

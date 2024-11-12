import { getColorByClassTailwind } from './getColors';

export default {
  PRIMARY: '#003670',
  SECONDARY: '#FFC72C',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: getColorByClassTailwind('bg-gray-300'),
  CYAN: getColorByClassTailwind('bg-cyan-400'),
};

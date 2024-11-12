import { style } from 'twrnc';

export const getColorByClassTailwind = (color: string) => {
  return (style(color)?.backgroundColor || '#22d3ee') as string;
};

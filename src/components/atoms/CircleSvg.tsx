import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import colorsStyle from '../../styles/colors.style';

interface CircleSvgProps {
  color?: string;
  opacity?: number;
}

const CircleSvg: React.FC<CircleSvgProps> = ({
  color = colorsStyle.PRIMARY,
  opacity = 1,
}) => {
  return (
    <Svg
      viewBox="0 0 100 100"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Circle fill={color} opacity={opacity} cx="50" cy="50" r="50" />
    </Svg>
  );
};

export default CircleSvg;

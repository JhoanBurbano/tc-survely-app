import React, { useMemo } from 'react';
import { G, Path, Svg } from 'react-native-svg';
import colorsStyle from '../../styles/colors.style';
import tw from 'twrnc';
import { WithTestProps } from '../../types/test.types';

interface LogoProps extends WithTestProps {
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark = false, testID }) => {
  const { background, icon } = useMemo(() => {
    if (isDark) {
      return {
        background: colorsStyle.PRIMARY,
        icon: colorsStyle.WHITE,
      };
    }
    return {
      background: colorsStyle.WHITE,
      icon: colorsStyle.PRIMARY,
    };
  }, [isDark]);
  return (
    <Svg viewBox="0 0 36.32 38.79" style={tw`w-20 h-20`} testID={testID}>
      <G>
        <G>
          <Path
            fill={background}
            d="m18.16,0C8.13,0,0,8.13,0,18.16c0,4.5,1.65,8.61,4.36,11.79v1.43s.02,7.41.02,7.41l6.41-3.72.3-.18c2.17.92,4.56,1.43,7.07,1.43,10.03,0,18.16-8.13,18.16-18.16S28.19,0,18.16,0Zm1.49,25.76c-.51.5-1.11.75-1.81.75s-1.31-.25-1.82-.75c-.5-.5-.75-1.11-.75-1.82s.25-1.3.75-1.81c.5-.51,1.11-.76,1.82-.76s1.3.25,1.81.76c.51.51.76,1.11.76,1.81s-.25,1.31-.76,1.82Zm4.48-7.18c-.95,1-2.08,1.51-3.39,1.51h-6.1v-3.85h3.85c.35,0,.65-.12.9-.37.25-.25.38-.55.38-.91s-.13-.65-.38-.9c-.25-.25-.56-.38-.9-.38h-7.07l-.64-3.85h9.96c1.31,0,2.44.51,3.39,1.52.95,1.01,1.43,2.22,1.43,3.62s-.48,2.63-1.43,3.63Z"
          />
          <Path
            fill={icon}
            d="m17.84,21.37c-.71,0-1.31.25-1.82.76-.5.51-.75,1.11-.75,1.81s.25,1.31.75,1.82c.5.5,1.11.75,1.82.75s1.3-.25,1.81-.75c.51-.5.76-1.11.76-1.82s-.25-1.3-.76-1.81c-.51-.51-1.11-.76-1.81-.76Z"
          />
          <Path
            fill={icon}
            d="m20.73,9.81h-9.96l.64,3.85h7.07c.35,0,.65.13.9.38.25.25.38.56.38.9s-.13.67-.38.91c-.25.25-.56.37-.9.37h-3.85v3.85h6.1c1.31,0,2.44-.5,3.39-1.51.95-1,1.43-2.21,1.43-3.63s-.48-2.61-1.43-3.62c-.95-1.01-2.08-1.52-3.39-1.52Z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default React.memo(Logo);

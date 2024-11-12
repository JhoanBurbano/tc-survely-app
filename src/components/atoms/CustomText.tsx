import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TextProps } from 'react-native-svg';
import { WithTestProps } from '../../types/test.types';
import Animated, {
  AnimatedProps,
  AnimatedStyle,
} from 'react-native-reanimated';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface CustomTextProps extends WithTestProps {
  children: string | React.ReactNode;
  containerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  textProps?: TextProps;
  style?: StyleProp<TextStyle>;
  containerProps?: AnimatedProps<ViewProps>;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  containerStyle = {},
  textProps = {},
  style = {},
  containerProps = {},
}) => {
  return (
    <Animated.View
      style={[
        { alignItems: 'center', justifyContent: 'center' },
        containerStyle,
      ]}
      {...containerProps}
    >
      <Text {...textProps} style={style}>
        {children}
      </Text>
    </Animated.View>
  );
};

export default CustomText;

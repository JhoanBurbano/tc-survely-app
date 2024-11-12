import React, {
  useImperativeHandle,
  useMemo,
  useCallback,
  forwardRef,
} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from './CustomText';
import twrnc from 'twrnc';
import colorsStyle from '../../styles/colors.style';
import { WithTestProps } from '../../types/test.types';
import { usePressAnimation } from '../../hooks/onPressAnimation';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { style as s } from 'twrnc';
import Svg, { Rect as SvgRect } from 'react-native-svg';
import { getColorByClassTailwind } from '../../styles/getColors';

const AnimatedRect = Animated.createAnimatedComponent(SvgRect);

interface CustomButtonProps extends WithTestProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyles?: StyleProp<TextStyle>;
  showLoading?: boolean;
  type?: 'filled' | 'outlined' | 'text';
}

export interface CustomButtonRef {
  startLoading: () => void;
  stopLoading: () => void;
}

const CustomButton = forwardRef<CustomButtonRef, CustomButtonProps>(
  (
    {
      text,
      onPress,
      disabled = false,
      style = {},
      textStyles,
      showLoading = true,
      type = 'filled',
      testID,
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const { animatedStyle, onPressIn, animatedProps } = usePressAnimation(
      (style.backgroundColor as string) || 'transparent',
      getColorByClassTailwind('bg-cyan-700'),
      type === 'outlined' ? 300 : 100,
      type
    );

    useImperativeHandle(
      ref,
      () => ({
        startLoading: () => setIsLoading(true),
        stopLoading: () => setIsLoading(false),
      }),
      []
    );

    const __handleOnPress = useCallback(() => {
      if (!isLoading && !disabled) {
        setIsLoading(true);
        onPress();
      }
    }, [isLoading, disabled, onPress]);

    const ButtonStyles = useMemo(() => {
      const baseStyles = [
        'rounded-full',
        'h-12',
        'items-center',
        'justify-center',
        'border',
        'border-2',
        disabled ? 'border-gray-400' : 'border-cyan-400',
        'bg-transparent',
      ];
      if (type === 'filled') {
        baseStyles.push(isLoading ? 'bg-cyan-400' : 'bg-transparent');
      }
      if (type === 'outlined') {
        baseStyles.push('bg-transparent');
        return [
          s(
            'relative w-[300px] h-[52px] rounded-full overflow-hidden border-cyan-400 border-2'
          ),
        ];
      }
      const toReturn = [twrnc`${baseStyles.join(' ')}`, style];
      if (type === 'filled' && !disabled && !isLoading) {
        toReturn.push(animatedStyle);
      }

      return toReturn;
    }, [type, disabled, isLoading, style, animatedStyle]);

    const __textStyles = useMemo(
      () => [
        twrnc`text-cyan-400 font-bold capitalize text-center active:text-white z-10 ${
          disabled ? 'text-gray-400' : ''
        }`,
        textStyles,
      ],
      [disabled, textStyles]
    );

    return (
      <TouchableWithoutFeedback onPress={__handleOnPress} onPressIn={onPressIn}>
        <Animated.View
          style={ButtonStyles}
          testID={testID}
          data-loading={isLoading}
        >
          {type === 'outlined' ? (
            <>
              <Svg height="52" width="300">
                <AnimatedRect
                  x="0"
                  y="0"
                  width="296"
                  height="47"
                  rx="20"
                  stroke={getColorByClassTailwind('bg-cyan-400') as string}
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray={670}
                  animatedProps={animatedProps}
                />
              </Svg>
              <View
                style={s(
                  'absolute inset-0 rounded-full items-center justify-center'
                )}
              >
                {isLoading && showLoading ? (
                  <ActivityIndicator color={colorsStyle.WHITE} />
                ) : (
                  <CustomText style={__textStyles}>{text}</CustomText>
                )}
              </View>
            </>
          ) : isLoading && showLoading ? (
            <ActivityIndicator color={colorsStyle.WHITE} />
          ) : (
            <CustomText style={__textStyles}>{text}</CustomText>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);

export default React.memo(CustomButton);

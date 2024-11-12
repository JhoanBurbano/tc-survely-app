import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useAnimatedProps,
  withDelay,
} from 'react-native-reanimated';
import { getColorByClassTailwind } from '../styles/getColors';

export const usePressAnimation = (
  initialColor = getColorByClassTailwind('bg-black-500'),
  pressedColor = getColorByClassTailwind('bg-cyan-500'),
  duration = 50,
  type: 'filled' | 'outlined' | 'text' = 'filled'
) => {
  const animation = useSharedValue(0);

  const onPressIn = () =>
    (animation.value = withTiming(1, { duration }, finished => {
      if (finished) {
        animation.value = withDelay(duration, withTiming(0, { duration }));
      }
    }));

  const animatedProps =
    type === 'outlined'
      ? useAnimatedProps(() => ({
          strokeDashoffset: withTiming(
            animation.value === 1 ? 0 : 2 * (300 + 40),
            {
              duration,
            }
          ),
        }))
      : undefined;

  const animatedStyle = useAnimatedStyle(() => {
    if (type === 'outlined') return {};

    const colorProperty = type === 'text' ? 'color' : 'backgroundColor';
    const colorValue = interpolateColor(
      animation.value,
      [0, 1],
      [initialColor, pressedColor]
    );

    return { [colorProperty]: colorValue };
  });

  return { animatedStyle, onPressIn, animatedProps };
};

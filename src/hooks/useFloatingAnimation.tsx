import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
  cancelAnimation,
} from 'react-native-reanimated';

interface FloatingAnimationProps {
  Component: React.ReactNode;
  amplitude?: number;
  duration?: number;
}

export const useFloatingAnimation = ({
  Component,
  amplitude = 10,
  duration = 2000,
}: FloatingAnimationProps) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-amplitude, {
        duration: duration / 2,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
    return () => {
      cancelAnimation(translateY);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return {
    Component: () => (
      <Animated.View style={animatedStyle}>{Component}</Animated.View>
    ),
    onCancel: () => {
      cancelAnimation(translateY);
    },
  };
};

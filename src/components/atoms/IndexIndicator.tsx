import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import tw from 'twrnc';
import colorsStyle from '../../styles/colors.style';
import Animated, { FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { WithTestProps } from '../../types/test.types';

const Pressable = Animated.createAnimatedComponent(TouchableWithoutFeedback);
const Icon = Animated.createAnimatedComponent(Feather);

interface IndexIndicatorProps extends WithTestProps {
  isCurrent: boolean;
  isCompleted: boolean;
  onPress: () => void;
}
const IndexIndicator: React.FC<IndexIndicatorProps> = ({
  isCurrent,
  isCompleted,
  onPress,
  testID,
}) => {
  const indicatorStyles = useMemo(() => {
    const classes = [
      'w-5',
      'h-5',
      'rounded-full',
      'bg-blue-900',
      'flex',
      'items-center',
      'justify-center',
    ];
    if (isCurrent) {
      classes.push('bg-cyan-400');
    }
    const classJoin = classes.join(' ');
    return tw`${classJoin}`;
  }, [isCurrent, isCompleted]);

  const icon = useMemo(() => {
    if (isCompleted) {
      return 'check';
    }
  }, [isCurrent, isCompleted]);

  return (
    <Pressable
      style={[indicatorStyles]}
      entering={ZoomOut.duration(500)}
      onPress={onPress}
      testID={testID}
      data-current={isCurrent}
    >
      {icon && (
        <Icon
          name={icon}
          size={16}
          color={colorsStyle.WHITE}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        />
      )}
    </Pressable>
  );
};

export default IndexIndicator;

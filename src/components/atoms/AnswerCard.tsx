import React, { useEffect, useMemo } from 'react';
import { Pressable as PressableComponent, Text, View } from 'react-native';
import CustomText from './CustomText';
import { QuestionAnswer } from '../../types/survey.type';
import tw from 'twrnc';
import colorsStyle from '../../styles/colors.style';
import { Feather } from '@expo/vector-icons';
import BackgroundSquares from './BackgroundSquares';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { getColorByClassTailwind } from '../../styles/getColors';

const Pressable = Animated.createAnimatedComponent(PressableComponent);

interface useSelectionAnimationProps {
  selected: boolean;
  selectedColor?: string;
  unSelectedColor?: string;
}

const useSelectionAnimation = ({
  selected = false,
  selectedColor = colorsStyle.PRIMARY,
  unSelectedColor = colorsStyle.BLACK,
}: Readonly<useSelectionAnimationProps>) => {
  const backgroundColor = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    backgroundColor.value = withTiming(selected ? 1 : 0, {
      duration: 500,
    });
  }, [selected]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [unSelectedColor, selectedColor]
    ),
  }));

  return { animatedContainerStyle };
};

interface AnswerCardProps {
  answer: QuestionAnswer;
  __onSelectOption: (answer: any) => void;
  selected: boolean;
  index: number;
  hiddeIcon?: boolean;
  message?: React.ReactNode | null;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  __onSelectOption,
  selected = false,
  index,
  hiddeIcon = false,
  message = null,
}) => {
  const { animatedContainerStyle } = useSelectionAnimation({
    selected,
    selectedColor: getColorByClassTailwind('bg-cyan-400'),
    unSelectedColor: getColorByClassTailwind('bg-gray-200'),
  });
  const __renderIcon = () => {
    const iconName = selected ? 'check-circle' : 'circle';
    const color = selected ? colorsStyle.WHITE : colorsStyle.PRIMARY;
    return (
      <Feather
        name={iconName}
        size={24}
        color={color}
        style={tw`absolute right-4`}
      />
    );
  };

  const containerStyle = useMemo(() => {
    const classList = [
      'bg-gray-200',
      'px-4',
      'py-4',
      'rounded-2xl',
      'relative',
      'flex-row',
      'gap-4',
      'items-center',
      'justify-center',
      'relative',
      'overflow-hidden',
    ];
    if (selected && !!message) {
      classList.push('bg-cyan-400');
    }
    if (!!message) {
      const color = ['cyan', 'red', 'yellow', 'amber'].at(Number(index) || 0)!;
      const prop = `bg-${color}-400`;
      classList.push('shadow-md min-h-[100px]', prop);
    }
    const joinedClasses = classList.join(' ');
    return [tw`${joinedClasses}`, !message && animatedContainerStyle];
  }, [selected, animatedContainerStyle, message]);
  const textStyle = useMemo(() => {
    const classList = ['font-bold', 'text-blue-900', 'w-full'];
    if (selected) {
      classList.push('text-white');
    }
    const joinedClasses = classList.join(' ');
    return [tw`${joinedClasses}`];
  }, [selected]);

  const idStyle = useMemo(() => {
    const classList = [
      'font-bold',
      'bg-blue-900',
      'w-6',
      'h-6',
      'text-center',
      'text-white',
      'rounded-full',
    ];
    if (selected) {
      classList.push('text-black', 'bg-white');
    }
    const joinedClasses = classList.join(' ');
    return [tw`${joinedClasses}`];
  }, [selected]);
  return (
    <Pressable
      onPress={() => __onSelectOption(answer)}
      style={containerStyle}
      entering={ZoomIn.duration(500).delay(index * 110)}
      exiting={ZoomOut.duration(500)}
    >
      <View
        style={[
          tw`absolute w-[400px] h-[500px]`,
          {
            transform: [{ rotate: '-90deg' }],
          },
        ]}
      >
        <BackgroundSquares
          background="#ffffff00"
          square={!!message ? '#00000022' : '#ffffff66'}
        />
      </View>
      <Text style={[idStyle]}>
        {answer.answer_id.split('.')[1].toLocaleUpperCase()}
      </Text>
      <View style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
        <CustomText style={textStyle}>{answer.answer}</CustomText>
        {!!message && (
          <CustomText
            style={{
              width: '100%',
              fontSize: 12,
              fontWeight: 'bold',
              color: colorsStyle.PRIMARY,
            }}
          >
            {message}
          </CustomText>
        )}
      </View>
      {!hiddeIcon && __renderIcon()}
    </Pressable>
  );
};

export default AnswerCard;

import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import CustomText from '../atoms/CustomText';
import { Question } from '../../types/survey.type';
import AnswerCard from '../atoms/AnswerCard';
import Animated, {
  LightSpeedInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';

interface QuestionCardProps {
  question: Question;
  answers: string[];
  __onSelectOption: (answer: any) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question: item,
  answers,
  __onSelectOption,
}) => {
  return (
    <Animated.View
      entering={LightSpeedInRight.duration(500)}
      exiting={LightSpeedOutLeft.duration(500)}
      style={tw`w-full max-w-[350px] h-[400px] bg-white rounded-md overflow-hidden shadow-sm gap-4`}
    >
      <View style={tw`px-2 py-8 bg-blue-900 rounded-b-3xl`}>
        <CustomText
          style={tw`text-lg font-bold text-white text-center`}
          containerStyle={tw`flex-row`}
        >
          {item.question}
        </CustomText>
      </View>
      <View style={tw`flex-1 gap-4 p-2`}>
        {item.answers.map((item, index) => (
          <AnswerCard
            key={item.answer_id}
            index={index + 1}
            answer={item}
            selected={answers.includes(item.answer_id)}
            __onSelectOption={__onSelectOption}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default QuestionCard;

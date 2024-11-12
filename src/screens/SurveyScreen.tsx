import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { addResponse, resetResponses } from '../store/slices/survey.slice';
import { useNavigationApp } from '../hooks/useNavigation';
import { useDispatchApp } from '../hooks/useDispatch';
import { selectSurvey } from '../store/selectors/survey.selector';
import { QuestionAnswer } from '../types/survey.type';
import RootTemplate from '../components/organisms/RootTemplate';
import tw from 'twrnc';
import { CustomButtonRef } from '../components/atoms/CustomButton';
import CustomText from '../components/atoms/CustomText';
import FooterSurvey from '../components/organisms/FooterSurvey';
import QuestionCard from '../components/organisms/QuestionCard';
import IndexIndicator from '../components/atoms/IndexIndicator';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import AnswerCard from '../components/atoms/AnswerCard';
import { Feather } from '@expo/vector-icons';
import { getColorByClassTailwind } from '../styles/getColors';
import { SendSurveyAnswers } from '../store/thunks/survey.thunk';

const SurveyScreen = () => {
  const dispatch = useDispatchApp();
  const navigation = useNavigationApp('Survey');
  const { answers, questions } = selectSurvey();
  const SendButtonRef = React.useRef<CustomButtonRef>(null);
  const ResetButtonRef = React.useRef<CustomButtonRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const candSendForm = useMemo(
    () =>
      answers?.length > 0 && answers.every(answer => answer && answer.length),
    [answers]
  );

  const currentQuestion = useMemo(
    () => questions?.data?.[currentIndex] || null,
    [questions, currentIndex]
  );

  const __renderMainSection = () => {
    if (candSendForm) {
      return (
        <Animated.View style={tw`gap-2`}>
          <View style={tw` gap-[2px]`}>
            <CustomText
              style={tw`text-2xl font-bold text-gray-200 `}
              containerStyle={tw`flex-row`}
            >
              No more
            </CustomText>
            <CustomText
              style={tw`text-4xl font-bold text-cyan-400 `}
              containerStyle={tw`flex-row`}
            >
              Questions
            </CustomText>
          </View>
          <Text style={tw`text-xs text-gray-200 text-sm text-center`}>
            Review your answers and submit the survey
          </Text>
        </Animated.View>
      );
    }
    return (
      <View style={tw`gap-2`}>
        <Animated.View
          style={tw`flex-row gap-[2px]`}
          entering={FadeIn.duration(500)}
          testID={'header-section'}
        >
          <CustomText
            style={tw`text-2xl font-bold text-blue-900`}
            containerStyle={tw`flex-row`}
          >
            Start the{' '}
          </CustomText>
          <CustomText
            style={tw`text-2xl font-bold text-cyan-400`}
            containerStyle={tw`flex-row`}
          >
            Survey
          </CustomText>
          <CustomText
            style={tw`text-2xl font-bold text-blue-900`}
            containerStyle={tw`flex-row`}
          >
            !
          </CustomText>
        </Animated.View>
        <CustomText
          style={tw`text-xs text-blue-950 text-sm`}
          containerStyle={tw`items-start`}
        >
          Answer the following questions
        </CustomText>
      </View>
    );
  };

  const __onSelectOption = useCallback(
    ({ answer_id }: QuestionAnswer) => {
      dispatch(addResponse({ answer_id }));
      setTimeout(() => {
        if (currentIndex === questions!.data.length - 1) {
          const indexOfNotAnswered = answers.findIndex(a => !a?.length);
          if (indexOfNotAnswered === -1) return;
          return setCurrentIndex(indexOfNotAnswered);
        }
        return setCurrentIndex(currentIndex + 1);
      }, 500);
    },
    [currentIndex]
  );

  const handleReset = () => {
    dispatch(resetResponses());
    setCurrentIndex(0);
    setTimeout(() => {
      ResetButtonRef.current?.stopLoading();
    }, 1000);
  };

  const __onRenderQuestion = () => {
    if (!questions?.data) return null;
    if (answers.filter(a => a?.length).length === questions.data.length)
      return (
        <Animated.View style={tw`gap-2`}>
          <CustomText
            style={tw`text-center text-xl font-bold text-white`}
            containerStyle={tw`px-2 py-4`}
          >
            These are all the questions
          </CustomText>
          {answers.map((answer, index) => {
            const [q, ans] = answer.split('.');
            const question = questions.data.at(Number(q) - 1);
            const text = question?.question || '';
            const selection = question?.answers.find(
              a => a.answer_id === answer
            );

            return (
              <AnswerCard
                key={questions.data[index].question_id}
                answer={{
                  answer_id: answer.split('.').reverse().join('.'),
                  answer: text,
                }}
                index={index}
                selected
                __onSelectOption={() => {}}
                hiddeIcon
                message={`(${ans}) ${selection?.answer}`}
              />
            );
          })}
        </Animated.View>
      );
    return (
      <QuestionCard
        key={currentQuestion!.question_id}
        question={currentQuestion!}
        answers={answers}
        __onSelectOption={__onSelectOption}
      />
    );
  };

  const __renderPointers = () => {
    if (!questions?.data) return null;
    if (candSendForm)
      return (
        <Animated.View
          style={tw`gap-2 w-full items-center justify-center flex-row flex-1`}
          entering={SlideInDown.duration(500)}
        >
          <Feather
            name="arrow-down"
            size={36}
            color={getColorByClassTailwind('bg-blue-800')}
          />
          <Feather
            name="arrow-down"
            size={36}
            color={getColorByClassTailwind('bg-cyan-400')}
          />
          <Feather
            name="arrow-down"
            size={36}
            color={getColorByClassTailwind('bg-blue-800')}
          />
        </Animated.View>
      );
    return (
      <View style={tw`flex-row justify-center gap-2`}>
        {questions.data.map((_, index) => (
          <IndexIndicator
            key={index}
            isCurrent={index === currentIndex}
            isCompleted={answers[index]?.length > 0}
            onPress={() => setCurrentIndex(index)}
            testID={`indicator-${index}`}
          />
        ))}
      </View>
    );
  };

  const handleSubmit = async () => {
    SendButtonRef.current?.startLoading();
    dispatch(SendSurveyAnswers())
      .then(x => {
        if (x.meta.requestStatus === 'rejected') return;
        navigation.navigate('Completion');
      })
      .finally(() => {
        SendButtonRef.current?.stopLoading();
      });
  };

  return (
    <RootTemplate
      footer={
        <FooterSurvey
          {...{
            candSendForm,
            handleReset,
            ResetButtonRef,
            SendButtonRef,
            handleSubmit,
          }}
        />
      }
    >
      <View style={tw`flex-1 gap-8 pb-8`}>
        {__renderMainSection()}
        {__onRenderQuestion()}
        {__renderPointers()}
      </View>
    </RootTemplate>
  );
};

export default SurveyScreen;

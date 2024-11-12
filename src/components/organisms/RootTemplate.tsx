import React from 'react';
import { View, SafeAreaView } from 'react-native';
import colorsStyle from '../../styles/colors.style';
import CircleSvg from '../atoms/CircleSvg';
import tw from 'twrnc';
import { ScrollView } from 'react-native-gesture-handler';
import { selectSurvey } from '../../store/selectors/survey.selector';
import Animated, { SlideInDown, SlideOutUp } from 'react-native-reanimated';

interface RootTemplateProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const RootTemplate: React.FC<RootTemplateProps> = ({
  children,
  footer = undefined,
}) => {
  const { answers } = selectSurvey();
  const completeForm = !answers.includes('');
  return (
    <React.Fragment>
      {completeForm ? (
        <Animated.View
          entering={SlideInDown.duration(500)}
          exiting={SlideOutUp.duration(500)}
        >
          <View
            style={[
              tw`absolute top-[0] left-[0] w-[100] h-[100] rounded-[25px]`,
              {
                transform: [{ rotate: '45deg' }],
                backgroundColor: colorsStyle.PRIMARY,
              },
            ]}
          ></View>
        </Animated.View>
      ) : (
        <View
          style={[
            tw`absolute top-[-25] right-[-25] w-60 h-60 rounded-[25px]`,
            {
              transform: [{ rotate: '15deg' }],
              backgroundColor: colorsStyle.PRIMARY,
            },
          ]}
        ></View>
      )}

      <SafeAreaView style={tw`flex-1 pt-[40px]`}>
        <ScrollView style={tw`flex-1 px-4 pt-8`}>{children}</ScrollView>
        {footer && <View>{footer}</View>}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default RootTemplate;

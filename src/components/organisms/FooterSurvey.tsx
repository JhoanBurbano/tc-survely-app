import React from 'react';
import colorsStyle from '../../styles/colors.style';
import CustomButton, { CustomButtonRef } from '../atoms/CustomButton';
import tw from 'twrnc';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface FooterSurveyProps {
  candSendForm: boolean;
  handleReset: () => void;
  ResetButtonRef: React.RefObject<CustomButtonRef>;
  SendButtonRef: React.RefObject<CustomButtonRef>;
  handleSubmit: () => void;
}

const FooterSurvey: React.FC<FooterSurveyProps> = ({
  candSendForm,
  handleReset,
  ResetButtonRef,
  SendButtonRef,
  handleSubmit,
}) => {
  return (
    <Animated.View
      entering={SlideInDown.duration(500).delay(400)}
      exiting={SlideOutDown.duration(500).delay(400)}
      style={[tw`p-4 relative overflow-hidden rounded-t-3xl mx-4 bg-gray-900`]}
      testID={'footer'}
    >
      <CustomButton
        text="Finalizar"
        onPress={handleSubmit}
        disabled={!candSendForm}
        ref={SendButtonRef}
        testID={'send-button'}
      />
      <CustomButton
        text="Reset Answers"
        onPress={handleReset}
        style={tw`border-0`}
        textStyles={{ color: colorsStyle.WHITE }}
        ref={ResetButtonRef}
        type="text"
        testID={'reset-button'}
      />
    </Animated.View>
  );
};

export default FooterSurvey;

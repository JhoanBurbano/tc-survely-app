import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { useNavigationApp } from '../hooks/useNavigation';
import CustomButton from '../components/atoms/CustomButton';
import CustomText from '../components/atoms/CustomText';
import BackgroundSquares from '../components/atoms/BackgroundSquares';
import Logo from '../components/atoms/Logo';
import LogoTeamCore from '../components/atoms/LogoTC';
import colorsStyle from '../styles/colors.style';
import tw from 'twrnc';
import { useDispatchApp } from '../hooks/useDispatch';
import { resetResponses } from '../store/slices/survey.slice';
import Animated, { SlideInRight, SlideOutDown } from 'react-native-reanimated';
import FinishCard from '../components/atoms/FinishCard';
import { useFocusEffect } from '@react-navigation/native';
import Isotype from '../components/atoms/Isotype';

const CompletionScreen = () => {
  const navigation = useNavigationApp('Completion');

  useFocusEffect(() => {
    const onBackPress = () => {
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  const [showMessage, setShowMessage] = React.useState(false);
  const dispatch = useDispatchApp();

  const __onHandleReset = async () => {
    dispatch(resetResponses());
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const __onHandleChangeToMessage = () => {
    setShowMessage(true);
    dispatch(resetResponses());
    setTimeout(() => {
      BackHandler.exitApp();
      dispatch(resetResponses());
      navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
    }, 3000);
  };

  return (
    <View style={tw`flex-1 justify-between items-center relative py-16`}>
      <View
        style={tw`absolute top-0 left-0 right-0 bottom-0`}
        testID="background-squares"
      >
        <BackgroundSquares />
      </View>
      <View style={tw`items-center gap-2`}>
        <Logo testID="logo" />
        <CustomText style={tw`text-white text-xl font-bold`}>
          Survely
        </CustomText>
      </View>
      <View style={tw`gap-4 justify-evenly items-center flex-1`}>
        {showMessage && (
          <View style={tw`gap-4 justify-center items-center`}>
            <CustomText style={tw`text-white text-3xl font-bold text-center`}>
              Thanks for completing the survey!
            </CustomText>
            <View style={tw`w-24 h-[2px] bg-cyan-400`} />
          </View>
        )}
        {showMessage && <FinishCard />}
        {!showMessage && (
          <Animated.View
            style={tw`gap-4 w-full items-center bg-white rounded-lg p-4`}
            entering={SlideInRight.duration(500)}
            exiting={SlideOutDown.duration(500)}
            testID="refill-card"
          >
            <View
              style={tw`flex-row justify-between items-center min-h-40 bg-gray-900 rounded-lg p-8`}
            >
              <Isotype color={colorsStyle.CYAN} />
            </View>
            <View style={tw`gap-4 justify-center items-center`}>
              <CustomText
                style={tw`text-blue-900 text-3xl font-bold text-center`}
              >
                ¿Do you want to send another?
              </CustomText>
              <View style={tw`w-24 h-[4px] bg-blue-900`} />
            </View>
            <CustomButton
              text="YES"
              onPress={__onHandleReset}
              style={tw`min-w-[270px] bg-gray-900 border-0 shadow-md`}
              textStyles={tw`uppercase text-white`}
            />
            <CustomButton
              text="NO"
              onPress={__onHandleChangeToMessage}
              style={tw`border-0`}
              textStyles={tw`text-gray-900 underline`}
              showLoading={false}
              type="text"
            />
          </Animated.View>
        )}
      </View>
      <View testID="footer-logo">
        <LogoTeamCore color={colorsStyle.WHITE} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003670',
  },
  thankYouText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CompletionScreen;

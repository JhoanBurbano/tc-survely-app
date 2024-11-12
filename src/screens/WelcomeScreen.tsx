import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigationApp } from '../hooks/useNavigation';
import CustomButton, {
  CustomButtonRef,
} from '../components/atoms/CustomButton';
import tw from 'twrnc';
import BackgroundSquares from '../components/atoms/BackgroundSquares';
import LogoTeamCore from '../components/atoms/LogoTC';
import colorsStyle from '../styles/colors.style';
import Logo from '../components/atoms/Logo';
import CustomText from '../components/atoms/CustomText';
import { useFloatingAnimation } from '../hooks/useFloatingAnimation';
import Animated, { FadeIn, LightSpeedInLeft } from 'react-native-reanimated';
import { useDispatchApp } from '../hooks/useDispatch';
import { GetSurveyQuestions } from '../store/thunks/survey.thunk';
import { useFocusEffect } from '@react-navigation/native';
import { selectSurvey } from '../store/selectors/survey.selector';

const MemoizedLogoTeamCore = React.memo(() => (
  <LogoTeamCore testID="teamcore-logo" color={colorsStyle.WHITE} />
));

const WelcomeScreen = () => {
  const navigation = useNavigationApp('Welcome');
  const buttonRef = React.useRef<CustomButtonRef>(null);
  const dispatch = useDispatchApp();
  const survey = selectSurvey();
  const __onPressStart = async () => {
    if (!survey.questions?.data?.length) {
      await dispatch(GetSurveyQuestions());
    }
    buttonRef.current?.stopLoading();
    navigation.navigate('Survey');
  };
  const { Component: AnimatedLogo, onCancel } = useFloatingAnimation({
    Component: (
      <React.Fragment>
        <Logo testID="logo" />
        <CustomText testID="app-title" style={styles.logoText}>
          Survely
        </CustomText>
      </React.Fragment>
    ),
  });

  useEffect(() => {
    if (survey.answers.some(answer => answer?.length)) {
      navigation.navigate('Survey');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        onCancel();
      };
    }, [])
  );

  return (
    <View testID="main-container" style={styles.container}>
      <View testID="background-squares" style={styles.absoluteFill}>
        <BackgroundSquares />
      </View>

      <View testID="header-section" style={styles.logoContainer}>
        <AnimatedLogo />
      </View>

      <View testID="content-section" style={styles.mainSection}>
        <View testID="welcome-section" style={styles.welcomeSection}>
          <CustomText
            testID="welcome-message"
            style={styles.welcomeMessage}
            containerProps={{
              entering: LightSpeedInLeft.duration(500),
            }}
          >
            ¡Welcome User!
          </CustomText>
          <Animated.View
            testID="separator-line"
            entering={LightSpeedInLeft.duration(500).delay(300)}
            layout={LightSpeedInLeft}
            style={styles.separatorLine}
          />
          <CustomText
            testID="description-text"
            containerStyle={tw`w-3/4`}
            style={styles.descriptionText}
            containerProps={{
              entering: LightSpeedInLeft.duration(500).delay(600),
            }}
          >
            Thank you for using Survely. Please take a moment to answer a few
            questions.
          </CustomText>
        </View>

        <Animated.View
          entering={LightSpeedInLeft.duration(500).delay(900)}
          layout={LightSpeedInLeft}
        >
          <CustomButton
            testID="start-button"
            text="Let's Start"
            onPress={__onPressStart}
            type="outlined"
            ref={buttonRef}
            showLoading={true}
          />
        </Animated.View>
      </View>

      <Animated.View
        testID="footer-logo"
        entering={FadeIn.duration(500).delay(1200)}
        layout={FadeIn}
      >
        <MemoizedLogoTeamCore />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`flex-1 justify-between items-center relative py-10 bg-black`,
    backgroundColor: colorsStyle.PRIMARY,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: colorsStyle.WHITE,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  logoContainer: tw`items-center gap-2`,
  mainSection: tw`gap-4 justify-evenly items-center flex-1`,
  welcomeSection: tw`gap-4 justify-evenly items-center`,
  welcomeMessage: tw`text-white text-5xl font-bold text-center`,
  separatorLine: tw`w-24 h-[2px] bg-cyan-400`,
  descriptionText: tw`text-white font-light text-center`,
  logoText: tw`text-white text-xl font-bold`,
});

export default WelcomeScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../atoms/Logo';
import colorsStyle from '../../styles/colors.style';
import { useFloatingAnimation } from '../../hooks/useFloatingAnimation';

const SplashScreen = () => {
  const { Component: AnimatedLogo } = useFloatingAnimation({
    Component: <Logo testID="logo" />,
  });

  return (
    <View style={styles.container}>
      <AnimatedLogo />
    </View>
  );
};

export default React.memo(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsStyle.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

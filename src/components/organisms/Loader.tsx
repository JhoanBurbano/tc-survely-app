import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../atoms/Logo';
import colorsStyle from '../../styles/colors.style';
import { useFloatingAnimation } from '../../hooks/useFloatingAnimation';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Rect as SvgRect } from 'react-native-svg';
import CustomText from '../atoms/CustomText';

const Loader = () => {
  const { Component: AnimatedLogo } = useFloatingAnimation({
    Component: (
      <React.Fragment>
        <Logo testID="logo" />
        <CustomText testID="app-title" style={styles.text}>
          Survely
        </CustomText>
      </React.Fragment>
    ),
    amplitude: 20,
  });

  return (
    <View style={styles.container}>
      <AnimatedLogo />
      <View style={styles.absoluteFill}>
        <AnimatedSvg />
      </View>
    </View>
  );
};

export default React.memo(Loader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsStyle.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
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
});

const Rect = Animated.createAnimatedComponent(SvgRect);

const AnimatedSvg = React.memo<{ square?: string }>(
  ({ square = '#FFFFFF08' }) => {
    return (
      <Svg id="Capa_6" data-name="Capa 6" viewBox="0 0 1125 2436">
        <Rect
          fill={square}
          x="-113.53"
          y="-108.83"
          width="666.67"
          height="666.67"
          rx="25.22"
          ry="25.22"
          transform="translate(-94.37 221.18) rotate(-45)"
          entering={FadeIn.duration(600)}
        />
        <Rect
          fill={square}
          x="206.47"
          y="659.17"
          width="666.67"
          height="666.67"
          rx="25.22"
          ry="25.22"
          transform="translate(-543.7 672.39) rotate(-45)"
          entering={FadeIn.duration(600).delay(300)}
        />
        <Rect
          fill={square}
          x="786.12"
          y="122.38"
          width="574.02"
          height="574.02"
          rx="25.22"
          ry="25.22"
          transform="translate(24.83 878.73) rotate(-45)"
          entering={FadeIn.duration(600).delay(600)}
        />
        <Rect
          fill={square}
          x="377.56"
          y="1774.93"
          width="744.03"
          height="744.03"
          rx="25.22"
          ry="25.22"
          transform="translate(-1298.58 1158.86) rotate(-45)"
          entering={FadeIn.duration(600).delay(900)}
        />
        <Rect
          fill={square}
          x="-350.19"
          y="1249.41"
          width="734.81"
          height="734.81"
          rx="25.22"
          ry="25.22"
          transform="translate(-1138.21 485.73) rotate(-45)"
          entering={FadeIn.duration(600).delay(1200)}
        />
        <Rect
          fill={square}
          x="845.13"
          y="1240.94"
          width="365.34"
          height="365.34"
          rx="25.22"
          ry="25.22"
          transform="translate(-705.61 1143.73) rotate(-45)"
          entering={FadeIn.duration(600).delay(1500)}
        />
        <Rect
          fill={square}
          x="-154.87"
          y="2240.94"
          width="365.34"
          height="365.34"
          rx="25.22"
          ry="25.22"
          transform="translate(-1705.61 729.52) rotate(-45)"
          entering={FadeIn.duration(600).delay(1800)}
        />
      </Svg>
    );
  }
);

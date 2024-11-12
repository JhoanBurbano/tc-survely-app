import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Text } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import tw from 'twrnc';
import { getColorByClassTailwind } from '../../styles/getColors';

const FinishCard = () => {
  return (
    <Animated.View
      style={tw`gap-6 max-w-[370px] items-center bg-white rounded-3xl p-4 shadow-xl h-80 justify-center`}
      entering={SlideInRight.duration(500)}
      exiting={SlideOutLeft.duration(500)}
    >
      <Text
        style={tw`text-black text-2xl font-bold text-center bg-blue-900 p-4 rounded-3xl text-white`}
      >
        Finalizado
      </Text>
      <FontAwesome6
        name="smile-beam"
        size={100}
        color={getColorByClassTailwind('bg-cyan-400')}
      />
      <Text style={tw`text-black text-lg font-bold text-center`}>
        We hope you have a great day!
      </Text>
    </Animated.View>
  );
};

export default React.memo(FinishCard);

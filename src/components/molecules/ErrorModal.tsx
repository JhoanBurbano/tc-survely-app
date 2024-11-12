import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import CustomText from '../atoms/CustomText';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatchApp } from '../../hooks/useDispatch';
import { cleanError } from '../../store/slices/ui.slice';
import tailwind from 'twrnc';

const ErrorModal: React.FC<{ error: string | null }> = ({ error }) => {
  const dispatch = useDispatchApp();

  const onClose = () => {
    dispatch(cleanError());
  };

  if (!error) return null;

  return (
    <Animated.View
      style={[styles.container]}
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
    >
      <Animated.View
        style={[styles.modal]}
        entering={ZoomIn.duration(500).delay(100)}
        exiting={ZoomOut.duration(500).delay(100)}
      >
        <View style={styles.circle}></View>
        <View style={[styles.circleBottom]}></View>
        <CustomText style={styles.title}>¡Oops!</CustomText>
        <CustomText>We have some issues</CustomText>
        <CustomText containerStyle={styles.error} style={styles.errorText}>
          {error}
        </CustomText>
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.textButtom}>Close</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: tailwind`absolute w-full h-full bg-black bg-opacity-80 justify-center items-center`,
  modal: tailwind`bg-white p-4 rounded-lg w-3/4 h-2/4 relative overflow-hidden justify-center items-center gap-4`,
  title: tailwind`text-3xl font-bold text-center text-red-600`,
  circle: tailwind`absolute w-40 h-40 -top-20 -left-20 bg-red-700 rounded-[30px]`,
  circleBottom: tailwind`absolute w-60 h-60 -bottom-20 -right-15 bg-blue-900 rounded-[30px]`,
  error: tailwind`w-full min-h-1/4 bg-gray-200 p-2 rounded-lg mt-4 shadow-md justify-start items-start`,
  errorText: tailwind`text-red-600`,
  button: tailwind`p-2 rounded-lg w-full bg-black justify-center items-center`,
  textButtom: tailwind`text-white rounded-lg font-bold p-2 uppercase`,
});

export default React.memo(ErrorModal);

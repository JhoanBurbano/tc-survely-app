import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from '../screens/WelcomeScreen';
import { RootStackParamList } from '../types/routes.type';
import Loader from '../components/organisms/Loader';
import SplashScreen from '../components/organisms/SplashScreen';
import { freezeEnabled } from 'react-native-screens';

const SurveyScreen = lazy(() => import('../screens/SurveyScreen'));
const CompletionScreen = lazy(() => import('../screens/CompletionScreen'));

const Stack = createStackNavigator<RootStackParamList>();

freezeEnabled();

function MainNavigator() {
  return (
    <NavigationContainer fallback={<SplashScreen />}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'pop',
          animation: 'default',
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            freezeOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Survey"
          children={() => (
            <Suspense fallback={<Loader />}>
              <SurveyScreen />
            </Suspense>
          )}
        />
        <Stack.Screen
          name="Completion"
          children={() => (
            <Suspense fallback={<Loader />}>
              <CompletionScreen />
            </Suspense>
          )}
        />
      </Stack.Navigator>
      <StatusBar style="auto" backgroundColor="transparent" />
    </NavigationContainer>
  );
}

export default MainNavigator;

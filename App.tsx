import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import SplashScreenComponent from './src/components/organisms/SplashScreen';
import ErrorBoundary from './src/components/organisms/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 100);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreenComponent />} persistor={persistor}>
        <ErrorBoundary>
          <MainNavigator />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

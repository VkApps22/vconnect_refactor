import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { LogBox, Platform } from 'react-native';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import './i18n';
import './src/config/init';
import store from './src/store';
import { Navigation } from './src/screens';
import { ToastProvider } from './src/hooks/toast';
import Theme from './src/theme';
import { LoadingOverlay } from './src/components';

enableScreens();

if (Platform.OS !== 'web') {
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs([
    'deprecated global rather than a module import: Constants (expo-constants)',
    'You are not currently signed in to Expo on your development machine. As a result,',
  ]);
}

const AppContents = () => (
  <Theme>
    <LoadingOverlay />
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  </Theme>
);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContents />
      </SafeAreaProvider>
    </Provider>
  );
}

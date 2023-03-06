import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { FocusAwareStatusBar, NavBackButton } from '../../components';

import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import LanguageScreen from './LanguageScreen';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const { t } = useTranslation();

  return (
    <>
      <FocusAwareStatusBar backgroundColor="#fff" />
      <Stack.Navigator
        screenOptions={{
          safeAreaInsets: { top: 0, bottom: 0 },
          headerBackTitleVisible: false,
          headerTintColor: '#00447a',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontSize: 20,
            lineHeight: 24,
            letterSpacing: 0.15,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerLeft: NavBackButton,
        }}
      >
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: t('settings') }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: t('my-profile') }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{ title: t('language') }}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsNavigator;

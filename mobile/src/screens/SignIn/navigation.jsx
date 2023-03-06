import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import FavoritesOfflineScreen from './FavoritesOfflineScreen';
import DetailsOfflineScreen from './DetailsOfflineScreen';
import AccountDataScreen from './AccountDataScreen';
import {
  BackButton,
  FocusAwareStatusBar,
  NavBackButton,
} from '../../components';
import PdfViewerScreen from '../Details/PdfViewerScreen';

const getTabBarBackButton = (onPress) => {
  return function TabBarBackButton() {
    return <BackButton onPress={onPress} />;
  };
};

const Stack = createStackNavigator();

const SignInNavigator = () => {
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
            elevation: 5,
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
          name="SignIn"
          component={SignInScreen}
          options={{ title: t('access-account') }}
        />
        <Stack.Screen
          options={{ title: t('create-your-account') }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ title: t('my-profile') }}
          name="AccountData"
          component={AccountDataScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={({ navigation }) => ({
            title: '',
            headerLeft: getTabBarBackButton(() =>
              navigation.navigate('SignIn')
            ),
          })}
        />
        <Stack.Screen
          name="FavoritesOffline"
          component={FavoritesOfflineScreen}
          options={{
            title: t('favorites'),
          }}
        />
        <Stack.Screen
          name="DetailsOfflineScreen"
          component={DetailsOfflineScreen}
          options={{
            title: t('details'),
          }}
        />
        <Stack.Screen
          name="PdfViewerOfflineScreen"
          component={PdfViewerScreen}
          options={{ headerShown: true, headerTitle: '' }}
        />
      </Stack.Navigator>
    </>
  );
};

export default SignInNavigator;

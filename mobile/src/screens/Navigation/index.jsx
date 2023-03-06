import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  fetchFavorites,
  fetchHasAlreadyLogged,
  selector as authSelector,
} from '../../store/auth';
import { useToast } from '../../hooks/toast';

import SignInNavigator from '../SignIn/navigation';
import HomeNavigator from '../Home/navigation';
import SettingsNavigator from '../Settings/navigation';
import WelcomeScreen from '../WelcomeScreen';
import AccountDataScreen from '../SignIn/AccountDataScreen';
import DetailsNavigator from '../Details/navigation';
import { NavBackButton } from '../../components';

const Stack = createStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    signedIn,
    language,
    lastUpdated,
    hasAlreadyLogged,
    pendingStorage,
  } = useSelector(authSelector);
  const { toast } = useToast();

  useEffect(() => {
    if (language && language !== i18n.languages[0])
      i18n.changeLanguage(language);
  }, [i18n, i18n.languages, language]);

  useEffect(() => {
    if (signedIn)
      dispatch(fetchFavorites()).then(unwrapResult).catch(toast.exception);
  }, [dispatch, signedIn, toast]);

  useEffect(() => {
    dispatch(fetchHasAlreadyLogged());
  }, [dispatch, signedIn]);

  if (signedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
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
        initialRouteName={!lastUpdated ? 'RequiredAccountData' : 'Home'}
      >
        {!lastUpdated && (
          <Stack.Screen
            options={{ title: t('my-profile') }}
            name="RequiredAccountData"
            component={AccountDataScreen}
          />
        )}
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Settings" component={SettingsNavigator} />
        <Stack.Screen name="Details" component={DetailsNavigator} />
      </Stack.Navigator>
    );
  }

  return pendingStorage ? (
    <></>
  ) : (
    <Stack.Navigator
      screenOptions={{
        safeAreaInsets: { top: 0, bottom: 0 },
        headerShown: false,
      }}
      initialRouteName={hasAlreadyLogged ? 'SignIn' : 'Welcome'}
    >
      {!hasAlreadyLogged && (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </>
      )}
      <Stack.Screen name="SignIn" component={SignInNavigator} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default Navigation;

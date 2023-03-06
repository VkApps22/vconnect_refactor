import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import MainScreen from './MainScreen';
import FavoritesScreen from './FavoritesScreen';
import ContactScreen from './ContactScreen';
import SearchNavigator from './Search/navigation';

import { selector as authSelector } from '../../store/auth';
import { env } from '../../config';

const DEVICE_WIDTH = Dimensions.get('window').width;

const BottomNavigation = createBottomTabNavigator();

const getTabBarIcon = (primaryName, focusedName, isMaterialCommunity) => {
  if (focusedName) {
    // eslint-disable-next-line react/display-name, react/prop-types
    return ({ color, focused, size }) =>
      isMaterialCommunity ? (
        <MaterialCommunityIcons
          name={focused ? focusedName : primaryName}
          color={color}
          size={size}
        />
      ) : (
        <Icon
          name={focused ? focusedName : primaryName}
          color={color}
          size={size}
        />
      );
  }
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ color, size }) =>
    isMaterialCommunity ? (
      <MaterialCommunityIcons name={primaryName} color={color} size={size} />
    ) : (
      <Icon name={primaryName} color={color} size={size} />
    );
};

const platformStyle =
  Platform.OS === 'android'
    ? {
        tabStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          marginTop: 4,
          marginBottom: 4,
        },
        style: {
          height: 65,
        },
      }
    : {};

const HomeNavigator = () => {
  const { t } = useTranslation();
  const { preferredName } = useSelector(authSelector);

  return (
    <BottomNavigation.Navigator
      screenOptions={{ headerStatusBarHeight: 0 }}
      tabBarOptions={{
        activeTintColor: '#00447A',
        activeBackgroundColor: '#FFFFFF',
        keyboardHidesTabBar: true,
        inactiveTintColor: 'rgba(0, 0, 0, 0.46)',
        inactiveBackgroundColor: '#ffffff',
        labelStyle: {
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 0.4,
        },
        tabStyle: {
          borderRadius: 8,
          marginLeft: 15,
          marginRight: 15,
          ...platformStyle.tabStyle,
        },
        style: {
          elevation: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: '#fff',
          position: 'absolute',
          borderTopWidth: 2,
          borderTopColor: '#e6e9ed',
          borderStartWidth: 1,
          borderStartColor: '#e6e9ed',
          borderEndWidth: 1,
          borderEndColor: '#e6e9ed',
          bottom: 0,
          width: DEVICE_WIDTH,
          ...platformStyle.style,
        },
      }}
    >
      <BottomNavigation.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: t('home'),
          tabBarIcon: getTabBarIcon('home-outline', 'home', true),
        }}
      />
      <BottomNavigation.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          title: t('search'),
          tabBarIcon: getTabBarIcon('search'),
        }}
      />
      {preferredName !== env.DEFAULT_USER_NAME && (
        <BottomNavigation.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: t('favorites'),
            tabBarIcon: getTabBarIcon('favorite-border', 'favorite'),
          }}
        />
      )}
      <BottomNavigation.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: t('contact'),
          tabBarIcon: getTabBarIcon('phone-outline', 'phone', true),
        }}
      />
    </BottomNavigation.Navigator>
  );
};

export default HomeNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import * as PropTypes from 'prop-types';

import SearchScreen from './SearchScreen';
import FilterScreen from './FilterScreen';
import ViewAllScreen from './ViewAllScreen';
import { BackButton, NavBackButton } from '../../../components';

const Stack = createStackNavigator();

const CloseButton = ({ onPress, tintColor }) => (
  <BackButton
    renderIcon={() => (
      <MaterialIcons name="close" size={25} color={tintColor} />
    )}
    onPress={onPress}
  />
);
CloseButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  tintColor: PropTypes.string.isRequired,
};

const SearchNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#00447a',
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerTitleStyle: {
          fontSize: 20,
          lineHeight: 24,
          letterSpacing: 0.15,
        },
      }}
    >
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          title: t('filters'),
          headerLeft: CloseButton,
        }}
      />
      <Stack.Screen
        name="ViewAllScreen"
        component={ViewAllScreen}
        options={{
          title: t('all-models'),
          headerLeft: NavBackButton,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;

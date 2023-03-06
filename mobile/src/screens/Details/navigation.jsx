import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavBackButton } from '../../components';
import PdfViewerScreen from './PdfViewerScreen';
import DetailsScreen from './DetailsScreen';
import FeedBackScreen from './FeedbackScreen';

const Stack = createStackNavigator();

const DetailsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
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
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedBackScreen} />
      <Stack.Screen
        name="PdfViewerScreen"
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: NavBackButton,
        }}
        component={PdfViewerScreen}
      />
    </Stack.Navigator>
  );
};

export default DetailsNavigator;

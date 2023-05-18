import * as React from 'react';

import { HomeScreen, PizzaDetailsScreen } from '../screens';
import { HomeStackParamList, HomeStackRoutes } from './routes';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HomeStackRoutes.Home} component={HomeScreen} />
      <Stack.Screen
        name={HomeStackRoutes.Details}
        component={PizzaDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export { HomeStack };

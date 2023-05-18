import * as React from 'react';

import { Header, HeaderLeftLabel } from './header';
import { HomeScreen, PizzaDetailsScreen } from '../screens';
import { HomeStackParamList, HomeStackRoutes } from './routes';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeStackRoutes.Home}
        component={HomeScreen}
        options={{
          headerBackground: () => <Header />,
        }}
      />
      <Stack.Screen
        name={HomeStackRoutes.Details}
        component={PizzaDetailsScreen}
        options={{
          headerBackground: () => <Header />,
          headerLeft: () => <HeaderLeftLabel />,
        }}
      />
    </Stack.Navigator>
  );
};

export { HomeStack };

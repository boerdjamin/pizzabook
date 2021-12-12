import * as React from 'react';
import HomeScreen from '../screens/home/home';
import PizzaDetailsScreen from '../screens/pizza-details/pizza-details';
import { createStackNavigator } from '@react-navigation/stack';
import { Pizza } from '../models/pizza';

const Stack = createStackNavigator<HomeStackParamList>();

export type HomeStackParamList = {
  [HomeStackRoutes.Home]: undefined;
  [HomeStackRoutes.Details]: { pizza: Pizza };
};

export enum HomeStackRoutes {
  Home = 'stack.home',
  Details = 'stack.details',
}

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

export default HomeStack;

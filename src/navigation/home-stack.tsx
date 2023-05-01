import * as React from 'react';
import HomeScreen from '../screens/home/home';
import PizzaDetailsScreen from '../screens/pizza-details/pizza-details';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList, HomeStackRoutes } from './routes';

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

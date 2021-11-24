import * as React from 'react';
import HomeScreen from '../screens/home/home';
import PizzaDetailsScreen from '../screens/pizza-details/pizza-details';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList, HomeStackRoutes } from './routes';

const RootStack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name={HomeStackRoutes.Home} component={HomeScreen} />
      <RootStack.Screen
        name={HomeStackRoutes.Details}
        component={PizzaDetailsScreen}
      />
    </RootStack.Navigator>
  );
};

export default HomeStack;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home/home';
import PizzaDetailsScreen from '../screens/pizza-details/pizza-details';
import { Pizza } from '../models/pizza';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Details]: { pizza: Pizza };
};

export enum Routes {
  Home = 'stack.home',
  Details = 'stack.details',
}

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={Routes.Home} component={HomeScreen} />
        <RootStack.Screen
          name={Routes.Details}
          component={PizzaDetailsScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

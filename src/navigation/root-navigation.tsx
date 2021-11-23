import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home/home';
import PizzaDetailsScreen from '../screens/pizza-details/pizza-details';
import { createStackNavigator } from '@react-navigation/stack';
import { RootRoutes, RootStackParamList } from './routes';

export type RootNavigationProps = {};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation: React.FC<RootNavigationProps> = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={RootRoutes.Home} component={HomeScreen} />
        <RootStack.Screen
          name={RootRoutes.Details}
          component={PizzaDetailsScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

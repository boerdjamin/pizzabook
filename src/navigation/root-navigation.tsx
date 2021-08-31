import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/home';
import PizzaDetailsScreen from '../screens/pizza-details/pizza-details';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pizza Book" component={HomeScreen} />
        <Stack.Screen name="Pizza Details" component={PizzaDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

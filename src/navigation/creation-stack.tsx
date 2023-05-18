import * as React from 'react';

import { CreatePizzaScreen, SelectionScreen } from '../screens';
import { CreationStackParamList, CreationStackRoutes } from './routes';

import { Header } from './header';
import { appTexts } from '../data';
import { createStackNavigator } from '@react-navigation/stack';
import { renderNothing } from '../utils';

const Stack = createStackNavigator<CreationStackParamList>();

const CreationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CreationStackRoutes.Selection}
        component={SelectionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={CreationStackRoutes.Pizza}
        component={CreatePizzaScreen}
        options={{
          title: appTexts.create_pizza_screen_title,
          headerBackground: () => <Header />,
        }}
      />
      <Stack.Screen
        name={CreationStackRoutes.Ingridient}
        // TODO
        component={renderNothing}
        options={{
          headerBackground: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};

export { CreationStack };

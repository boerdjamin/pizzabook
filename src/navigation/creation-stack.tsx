import * as React from 'react';

import { CreatePizzaScreen, SelectionScreen } from '../screens';
import { CreationStackParamList, CreationStackRoutes } from './routes';

import { Colors } from '../styles';
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
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name={CreationStackRoutes.Ingridient}
        // TODO
        component={renderNothing}
      />
    </Stack.Navigator>
  );
};

export { CreationStack };

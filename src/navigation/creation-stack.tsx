import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePizzaScreen from '../screens/create-pizza/create-pizza';
import { renderNothing } from '../utils/placeholder';
import SelectionScreen from '../screens/select-creation/selection';
import { appTexts } from '../data/texts';
import { Colors } from '../styles';
import { CreationStackParamList, CreationStackRoutes } from './routes';

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

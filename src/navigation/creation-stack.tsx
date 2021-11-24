import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Pizza as IPizza } from '../models/pizza';
import CreatePizzaScreen from '../screens/create-pizza/create-pizza';
import { renderNothing } from '../utils/placeholder';
import SelectionScreen from '../screens/select-creation/selection';

const Stack = createStackNavigator<CreationStackParamList>();

export type CreationStackParamList = {
  [CreationStackRoutes.Selection]: undefined;
  [CreationStackRoutes.Pizza]: undefined;
  [CreationStackRoutes.Ingridient]: { pizza?: IPizza };
};

export enum CreationStackRoutes {
  Selection = 'creation.stack.selection',
  Pizza = 'creation.stack.pizza',
  Ingridient = 'creation.stack.ingridient',
}

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
      />
      <Stack.Screen
        name={CreationStackRoutes.Ingridient}
        // TODO
        component={renderNothing}
      />
    </Stack.Navigator>
  );
};

export default CreationStack;

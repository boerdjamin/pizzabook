import * as React from 'react';

import { CreateUserScreen, ProfileScreen } from '../screens';
import { ProfileStackParamList, ProfileStackRoutes } from './routes';

import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ProfileStackRoutes.Main}
        component={ProfileScreen}
      />
      <RootStack.Screen
        name={ProfileStackRoutes.CreateUser}
        component={CreateUserScreen}
      />
    </RootStack.Navigator>
  );
};

export { ProfileStack };

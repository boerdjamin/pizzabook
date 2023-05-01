import * as React from 'react';
import ProfileScreen from '../screens/profile/profile-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackRoutes, ProfileStackParamList } from './routes';
import CreateUserScreen from '../screens/create-user/create-user-screen';

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

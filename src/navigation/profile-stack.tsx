import * as React from 'react';
import ProfileScreen from '../screens/profile/profile-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackRoutes, ProfileStackParamList } from './routes';

const RootStack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ProfileStackRoutes.Main}
        component={ProfileScreen}
      />
    </RootStack.Navigator>
  );
};

export default ProfileStack;

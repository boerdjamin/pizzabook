import * as React from 'react';

import { CreateUserScreen, ProfileScreen } from '../screens';
import { ProfileStackParamList, ProfileStackRoutes } from './routes';

import { Header } from '../components';
import { HeaderLeftLabel } from './header';
import { appTexts } from '../data';
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
        options={{
          title: appTexts.create_user_screen_title,
          headerBackground: () => <Header />,
          headerLeft: () => <HeaderLeftLabel />,
        }}
      />
    </RootStack.Navigator>
  );
};

export { ProfileStack };

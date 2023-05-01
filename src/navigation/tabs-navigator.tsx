import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appTexts } from '../data/texts';
import Icons from '../../assets/icons';
import { HomeStack, ProfileStack, CreationStack, TabsRoutes } from './index';
import { Icon } from '../components';

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tabs.Navigator
    initialRouteName={TabsRoutes.Home}
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}>
    <Tabs.Screen
      name={TabsRoutes.Home}
      options={{
        tabBarLabel: appTexts.home,
        tabBarIcon: () => <Icon icon={Icons.home} />,
      }}
      component={HomeStack}
    />
    <Tabs.Screen
      name={TabsRoutes.AddPizza}
      component={CreationStack}
      options={{
        tabBarLabel: appTexts.add_pizza,
        tabBarIcon: () => <Icon icon={Icons.plus} />,
      }}
    />
    <Tabs.Screen
      name={TabsRoutes.Profile}
      component={ProfileStack}
      options={{
        headerShown: false,
        tabBarLabel: appTexts.profile,
        tabBarIcon: () => <Icon icon={Icons.user} />,
      }}
    />
  </Tabs.Navigator>
);

export { TabsNavigator };

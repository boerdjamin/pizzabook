import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import { appTexts } from '../data/texts';
import Icons from '../../assets/icons';
import ProfileStack from './profile-stack';
import Icon from '../components/icon/icon';
import CreationStack from './creation-stack';

const Tabs = createBottomTabNavigator();

export enum TabsRoutes {
  Home = 'tabs.home',
  AddPizza = 'tabs.add_pizza',
  Profile = 'tabs.profile',
}

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

export default TabsNavigator;

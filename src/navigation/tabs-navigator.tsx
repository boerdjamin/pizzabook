import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import { appTexts } from '../data/texts';
import Icons from '../../assets/icons';
import { Image } from 'react-native';
import commonStyles from '../styles/common';
import { renderNothing } from '../utils/placeholder';
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
        tabBarIcon: () => (
          <Image source={Icons.home} style={commonStyles.icon} />
        ),
      }}
      component={HomeStack}
    />
    <Tabs.Screen
      name={TabsRoutes.AddPizza}
      component={CreationStack}
      options={{
        tabBarLabel: appTexts.add_pizza,
        tabBarIcon: () => (
          <Image source={Icons.plus} style={commonStyles.icon} />
        ),
      }}
    />
    <Tabs.Screen
      name={TabsRoutes.Profile}
      // TODO: Add profile section
      component={renderNothing}
      options={{
        tabBarLabel: appTexts.profile,
        tabBarIcon: () => (
          <Image source={Icons.user} style={commonStyles.icon} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default TabsNavigator;

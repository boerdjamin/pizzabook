import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import { TabsRoutes } from './routes';
import { appTexts } from '../data/texts';
import Icons from '../../assets/icons';
import { Image } from 'react-native';
import commonStyles from '../styles/common';
import { renderNothing } from '../utils/placeholder';
import ProfileStack from './profile-stack';

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tabs.Navigator
    initialRouteName={TabsRoutes.Home}
    screenOptions={{
      tabBarShowLabel: false,
    }}>
    <Tabs.Screen
      name={TabsRoutes.Home}
      options={{
        headerShown: false,
        tabBarLabel: appTexts.home,
        tabBarIcon: () => (
          <Image source={Icons.home} style={commonStyles.icon} />
        ),
      }}
      component={HomeStack}
    />
    <Tabs.Screen
      name={TabsRoutes.AddPizza}
      component={renderNothing}
      options={{
        tabBarLabel: appTexts.add_pizza,
        tabBarIcon: () => (
          <Image source={Icons.plus} style={commonStyles.icon} />
        ),
      }}
    />
    <Tabs.Screen
      name={TabsRoutes.Profile}
      component={ProfileStack}
      options={{
        headerShown: false,
        tabBarLabel: appTexts.profile,
        tabBarIcon: () => (
          <Image source={Icons.user} style={commonStyles.icon} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default TabsNavigator;

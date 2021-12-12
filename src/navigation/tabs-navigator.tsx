import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import { TabsRoutes } from './routes';
import { appTexts } from '../data/texts';
import Icons from '../../assets/icons';
import { renderNothing } from '../utils/placeholder';
import ProfileStack from './profile-stack';
import Icon from '../components/icon/icon';

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
        tabBarIcon: () => <Icon icon={Icons.home} />,
      }}
      component={HomeStack}
    />
    <Tabs.Screen
      name={TabsRoutes.AddPizza}
      component={renderNothing}
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

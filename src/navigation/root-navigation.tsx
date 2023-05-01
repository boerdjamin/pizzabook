import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator } from './index';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
};

export { RootNavigation };

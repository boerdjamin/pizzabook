import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './tabs-navigator';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
};

export default RootNavigation;

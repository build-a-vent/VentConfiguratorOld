import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Config from './views/Config';
import Index from './views/Index';

export type AppScreens = 'Index';

export type RootStackParamList = {
  Index: undefined;
  Config: undefined;
};
const NavStack = createStackNavigator<RootStackParamList>();
const AppNavigator: React.FunctionComponent = () => {
  return (
    <NavStack.Navigator initialRouteName="Index" headerMode="none">
      <NavStack.Screen name="Index" component={Index} />
      <NavStack.Screen name="Config" component={Config} />
    </NavStack.Navigator>
  );
};

export default AppNavigator;

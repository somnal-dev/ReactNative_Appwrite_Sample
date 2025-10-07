import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import routes from './routes';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.main} component={MainScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

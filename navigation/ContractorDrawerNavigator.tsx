import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Login from '../screens/Login';

const ContractorDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Login} />
    </Drawer.Navigator>
  );
};

export default ContractorDrawerNavigator;

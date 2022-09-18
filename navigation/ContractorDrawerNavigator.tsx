import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Catalog from '../screens/Catalog';
import Dashboard from '../screens/Dashboard';
import OrderEntry from '../screens/OrderEntery';
import OrderReport from '../screens/OrderReport';

const ContractorDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Order Entry" component={OrderEntry} />
      <Drawer.Screen name="Order Report" component={OrderReport} />
      <Drawer.Screen name="Catalog" component={Catalog} />
    </Drawer.Navigator>
  );
};

export default ContractorDrawerNavigator;

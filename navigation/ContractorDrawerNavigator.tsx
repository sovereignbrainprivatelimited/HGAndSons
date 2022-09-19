import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Catalog from '../screens/Catalog';
import Dashboard from '../screens/Dashboard';
import OrderEntry from '../screens/OrderEntery';
import OrderReport from '../screens/OrderReport';
import logo from '../constants/images/Logo.png'
import CustomDrawer from '../common/components/CustomDrawer';
import Ionicons  from 'react-native-vector-icons'

const ContractorDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home"
      screenOptions={{
      drawerStyle: {
        backgroundColor: '#28282B',
      },
      drawerLabelStyle:{
        color:'#FFD700'
      }
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Dashboard} 
      // options={{
      //   drawerIcon: ({color, size}) => (
      //     <Ionicons
      //        name="md-home" size={size} color={color}
      //     />
      //   )
      // }}
       />
      <Drawer.Screen name="Order Entry" component={OrderEntry}  />
      <Drawer.Screen name="Order Report" component={OrderReport} />
      <Drawer.Screen name="Catalog" component={Catalog} />
    </Drawer.Navigator>
  );
};

export default ContractorDrawerNavigator;

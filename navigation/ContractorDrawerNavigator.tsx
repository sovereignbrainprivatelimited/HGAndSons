import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Catalog from '../screens/Catalog';
import Dashboard from '../screens/Dashboard';
import OrderEntry from '../screens/OrderEntery';
import OrderReport from '../screens/OrderReport';
import CustomDrawer from '../common/components/CustomDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      options={{
        drawerIcon: ({color}) => (
          <Icon name="home" size={22} color={'#FFD700'}/>
        )
      }}
       />
      <Drawer.Screen name="Order Entry" component={OrderEntry} 
      options={{
        drawerIcon: ({color}) => (
          <Icon name="list" size={22} color={'#FFD700'}/>
        )
      }}
       />
      <Drawer.Screen name="Order Report" component={OrderReport} 
      options={{
        drawerIcon: ({color}) => (
          <Icon name="book" size={22} color={'#FFD700'}/>
        )
      }}
      />
      <Drawer.Screen  name="Catalog" component={Catalog} 
      options={{
        drawerIcon: ({color}) => (
          <Icon name="file" size={22} color={'#FFD700'}/>
        )
      }}
      />
    </Drawer.Navigator>
  );
};

export default ContractorDrawerNavigator;

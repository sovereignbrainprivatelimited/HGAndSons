import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import Catalog from "../screens/Catalog";
import Dashboard from "../screens/Dashboard";
import OrderEntry from "../screens/OrderEntery";
import OrderReport from "../screens/OrderReport";
import CustomDrawer from "../common/components/CustomDrawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native-svg";
import ContactUs from "../screens/ContactUs";
import AboutUs from "../screens/AboutUs";
import CatalogHome from "../screens/CatalogHome";
import { getStoreValue } from "../common/LocalStorage";
import { View } from "native-base";
import Logout from "../screens/Logout";

const ContractorDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getuserType = async () => {
      let usertpe = await getStoreValue("userType");
      console.log("id::", usertpe);
      setUserId(usertpe);
    };
    getuserType();
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#28282B",
        },
        drawerLabelStyle: {
          color: "#D4AF37",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {userId == "1" && (
        <>
          <Drawer.Screen
            name="Home"
            component={Dashboard}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="home" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="About Us"
            component={AboutUs}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="users" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Order Entry"
            component={OrderEntry}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="list" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Catalog"
            component={CatalogHome}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="file" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Order Status Report"
            component={OrderReport}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="book" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Contact Us"
            component={ContactUs}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="comments" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            component={Logout}
            name="LogOut"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="comments" size={22} color={"#D4AF37"} />
              ),
            }}
          />
        </>
      )}
      {userId === "2" && (
        <>
          <Drawer.Screen
            name="Home"
            component={Dashboard}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="home" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="About Us"
            component={AboutUs}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="users" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Order Entry"
            component={OrderEntry}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="list" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            component={Logout}
            name="LogOut"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="comments" size={22} color={"#D4AF37"} />
              ),
            }}
          />
        </>
      )}
      {userId === "3" && (
        <>
          <Drawer.Screen
            name="Home"
            component={Dashboard}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="home" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="About Us"
            component={AboutUs}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="users" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Order Entry"
            component={OrderEntry}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="list" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Catalog"
            component={CatalogHome}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="file" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Order Status Report"
            component={OrderReport}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="book" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            name="Contact Us"
            component={ContactUs}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="comments" size={22} color={"#D4AF37"} />
              ),
            }}
          />
          <Drawer.Screen
            component={Logout}
            name="LogOut"
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="comments" size={22} color={"#D4AF37"} />
              ),
            }}
          />
        </>
      )}
      {userId == null && (
        <Drawer.Screen
          component={Loader}
          name=" "
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="comments" size={22} color={"#D4AF37"} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

const Loader = () => {
  return (
    <View>
      <Text>{"Loading"}</Text>
    </View>
  );
};

export default ContractorDrawerNavigator;

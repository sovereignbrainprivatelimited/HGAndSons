import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// import Menu from '../Menu';

// import NavigationService from '../../navigation/NavigationService';
// import { Color } from '../../utils/Themes';
// import CustomIcon from '../CustomIcon';
import logo from "../../constants/images/Logo.png";

const CustomDrawer = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "#28282B" }}
        scrollEnabled={false}
        {...props}
      >
        <ImageBackground
          source={logo}
          style={{
            padding: 20,
            width: 100,
            height: 100,
            alignSelf: "center",
            marginBottom: 50,
          }}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* <TouchableOpacity>
        <Text style={{ color: "white" }}>{"Logout"}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default CustomDrawer;

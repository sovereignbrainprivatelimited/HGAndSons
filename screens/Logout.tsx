import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "native-base";
import React, { useEffect } from "react";

const Logout = ({ navigation }: any) => {
  useEffect(() => {
    const onLogout = () => {
      //   AsyncStorage.clear();
      navigation.navigate("Login");
    };
    onLogout();
  });
  return <View></View>;
};

export default Logout;

import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
// import { getLocalAuth, setLocalAuth } from "../screens/LoginScreen";

const AppStack = ({ navigation }) => {
  useEffect(() => {
    async function localAuthPermission() {
      Alert.alert(
        "Secure Chishiya Security Shield with Screen lock!!",
        "Protect your wallet account from unauthorised access by enabling it.",
        [
          {
            text: "Enable now",
            onPress: () => console.log("Enabled"),
          },
          {
            text: "Skip",
            onPress: () => console.log("Skipped"),
          },
        ]
      );
    }
    // const result = getLocalAuth("isLocalAuthEnabled");
    // console.log(result);
    // if (result !== null && result === false) {
    //   localAuthPermission();
    // }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>AppStack</Text>
    </View>
  );
};

export default AppStack;

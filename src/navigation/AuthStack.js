import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppStack from "../navigation/AppStack";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import QRCodeScanner from "../screens/QRCodeScanner";
import OfferScreen from "../screens/OfferScreen";

const Stack = createNativeStackNavigator();

let initialRouteName = "Login";
const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, presentation: "modal" }}
        initialRouteName={initialRouteName}
      >
        {console.log(initialRouteName)}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OtpVerificationScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="QR" component={QRCodeScanner} />
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name="Offer" component={OfferScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;

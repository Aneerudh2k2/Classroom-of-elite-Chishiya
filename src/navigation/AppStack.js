import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";

// Screen imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WalletScreen from "../screens/WalletScreen";
import TransferScreen from "../screens/TransferScreen";
import MarketPlaceScreen from "../screens/MarketPlaceScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Icon imports
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
// import { getLocalAuth, setLocalAuth } from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator
      initialRouteName="Wallet"
      backBehavior="history"
      screenOptions={{
        tabBarAllowFontScaling: true,
        headerStyle: {
          backgroundColor: "#E6AACE",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
        tabBarStyle: {
          // position: "absolute",
          height: 62,
          width: "88%",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 22,
          marginBottom: 23,
          backgroundColor: "#f5e5fc",
          elevation: 3,
        },
        tabBarLabelStyle: { fontSize: 11.5 },
        tabBarActiveTintColor: "#B619A7",
        tabBarInactiveTintColor: "#90708c",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }) => ({
          title: "Wallet",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: 600 },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Fontisto
                name="wallet"
                size={focused ? 30 : 25}
                color={focused ? "#B619A7" : "#90708c"}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={({ navigation }) => ({
          title: "Transfer",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: 600 },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="transfer-within-a-station"
                size={focused ? 30 : 26}
                color={focused ? "#B619A7" : "#90708c"}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="MarketPlace"
        component={MarketPlaceScreen}
        options={({ navigation }) => ({
          headerTitle: "Rewards & Shopping",
          title: "Marketplace",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: 600 },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Entypo
                name="shop"
                size={focused ? 30 : 25}
                color={focused ? "#B619A7" : "#90708c"}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Account",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: 600 },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="account-circle"
                size={focused ? 30 : 25}
                color={focused ? "#B619A7" : "#90708c"}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

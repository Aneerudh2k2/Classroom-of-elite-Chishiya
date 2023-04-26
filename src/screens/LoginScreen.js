import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../components/CustomButton";
import * as LocalAuth from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

// import LoginSVG from "../assets/images/login.svg";
// import GoogleSVG from "../assets/images/google.svg";
// import FacebookSVG from "../assets/images/facebook.svg";
// import TwitterSVG from "../assets/images/twitter.svg";
// export const setLocalAuth = async (value) => {
//   try {
//     await AsyncStorage.setItem("isLocalAuthEnabled", value);
//   } catch (e) {
//     // saving error
//     console.log(e);
//   }
// };

// export const getLocalAuth = async (keyName) => {
//   try {
//     const isLocalAuthEnabled = await AsyncStorage.getItem(keyName);
//     console.log("isLocalAuthEnabled", isLocalAuthEnabled);
//     if (isLocalAuthEnabled !== null) {
//       return isLocalAuthEnabled;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const isLocalAuthEnabled = await AsyncStorage.getItem("biometric");

      if (isLocalAuthEnabled === "true") {
        const result = await LocalAuth.authenticateAsync({
          promptMessage: "Login to Chishiya",
          cancelLabel: "Cancel",
          requireConfirmation: true,
        });
        if (!result.success) {
          console.log(result);
        } else {
          setIsAuthenticated(result.success);
          navigation.navigate("App", { screen: "Wallet" });
        }
      } else {
        Alert.alert(
          "Protect Now!",
          "Enable biometric now to Secure your account!",
          [
            {
              text: "Cancel",
              onPress: async () => {
                await AsyncStorage.setItem("biometric", "false");
              },
            },
            {
              text: "Enable Now",
              onPress: async () => {
                await AsyncStorage.setItem("biometric", "true");
              },
            },
          ]
        );
      }
    };

    authenticate();
  }, []);

  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        animated={true}
        // backgroundColor="rgb(230, 153, 206)"
        backgroundColor="#E6AACE"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />
      <View
        style={{ flex: 1, justifyContent: "center" }}
        onLayout={onLayoutRootView}
      >
        {/* {isAuthenticated ? ( */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 25, marginTop: 55 }}
        >
          {/* <View style={{ paddingHorizontal: 25 }}> */}
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ height: 300, width: 300 }}
              source={require("../assets/images/Mobile-login-amico.png")}
            />
          </View>

          <Text
            style={{
              fontFamily: "Montserrat",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          {/* 
        <InputField
          label={"Email ID or Phone number with country code"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 6 }}
            />
          }
          keyboardType="email-address"
        /> */}

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />

            <TextInput
              placeholder={"Email ID"}
              keyboardType="email-address"
              style={{ flex: 1, paddingVertical: 0 }}
              cursorColor={"#AD40AF"}
              autoCorrect={true}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          {/* <InputField
        //   label={"Password"}
        //   icon={
        //     <Ionicons
        //       name="ios-lock-closed-outline"
        //       size={20}
        //       color="#666"
        //       style={{ marginRight: 5 }}
        //     />
        //   }
        //   inputType="password"
        //   fieldButtonLabel={"Forgot?"}
        //   fieldButtonFunction={() => {}}
        // /> */}
          <CustomButton
            label={"Send OTP"}
            onPress={async () => {
              navigation.navigate("OTP", {
                email: "devcrazapp@gmail.com",
              });
              // console.log(email);
              // let response = await fetch(
              //   "http://192.168.43.99:5000/api/auth/signinup/code/",
              //   {
              //     method: "POST",
              //     mode: "cors", // no-cors, *cors, same-origin
              //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              //     credentials: "same-origin",
              //     headers: { "Content-Type": "application/json" },
              //     body: JSON.stringify({
              //       email: email,
              //     }),
              //   }
              // );
              // response = await response.json();
              // console.log(response);
              // if (response.status === "OK") {
              //   navigation.navigate("OTP", {email});
              // } else {
              //   Alert.alert("Failed to login!!", "Try again");
              // }
            }}
          />
          <Text
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: 30,
              fontFamily: "Montserrat",
            }}
          >
            Or, login with ...
          </Text>

          {/* <View
        //   style={{
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     marginBottom: 30,
        //   }}
        // >
        //   <TouchableOpacity
        //     onPress={() => {}}
        //     style={{
        //       borderColor: "#ddd",
        //       borderWidth: 2,
        //       borderRadius: 10,
        //       paddingHorizontal: 30,
        //       paddingVertical: 10,
        //     }}
        //   >
        //     <GoogleSVG height={24} width={24} />
        //   </TouchableOpacity>
        //   <TouchableOpacity
        //     onPress={() => {}}
        //     style={{
        //       borderColor: "#ddd",
        //       borderWidth: 2,
        //       borderRadius: 10,
        //       paddingHorizontal: 30,
        //       paddingVertical: 10,
        //     }}
        //   >
        //     <FacebookSVG height={24} width={24} />
        //   </TouchableOpacity>
        //   <TouchableOpacity
        //     onPress={() => {}}
        //     style={{
        //       borderColor: "#ddd",
        //       borderWidth: 2,
        //       borderRadius: 10,
        //       paddingHorizontal: 30,
        //       paddingVertical: 10,
        //     }}
        //   >
        //     <TwitterSVG height={24} width={24} />
        //   </TouchableOpacity>
        // </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text style={{ fontFamily: "Montserrat" }}>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: "#AD40AF",
                  fontWeight: "700",
                  fontFamily: "Montserrat",
                }}
              >
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* ) : (
           <View style={{ justifyContent: "center", alignItems: "center" }}>
             <Text>{!isAuthenticated ? "" : "Access Denied!!"}</Text>
           </View>
         )} */}
      </View>
    </>
  );
};

export default LoginScreen;

// import { View, Text, StyleSheet } from "react-native";
// import React from "react";

// const LoginScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>LoginScreen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default LoginScreen;

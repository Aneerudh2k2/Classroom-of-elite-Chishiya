import { StyleSheet, View, Text } from "react-native";
import React, { useCallback } from "react";
import AuthStack from "./src/navigation/AuthStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./src/assets/fonts/Montserrat-Regular.ttf"),
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
    <AuthStack />
    // <View style={styles.er}>
    //   <Text>Hello anee</Text>
    // </View>
  );
};

// #E6AACE
// #B619A7
// #ad40af
// #90708c
// #ea4c89
// #ffafcc

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

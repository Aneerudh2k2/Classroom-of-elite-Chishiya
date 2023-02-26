import { StyleSheet, View, Text } from "react-native";
import React from "react";
import AuthStack from "./src/navigation/AuthStack";

export default function App() {
  return (
    <AuthStack />
    // <View style={styles.er}>
    //   <Text>Hello anee</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

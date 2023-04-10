import { StyleSheet, View, Text } from "react-native";
import React from "react";
import AuthStack from "./src/navigation/AuthStack";

const App = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const MarketPlaceScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleApi = async () => {
    try {
      setLoading(true);
      let result = await fetch("https://randomuser.me/api?results=150");
      result = await result.json();
      if (result.results.length !== 0) {
        console.log(result);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleApi();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text>Loading.....</Text> */}
        <LottieView
          autoPlay
          speed={5}
          style={{
            width: 100,
            height: 100,
            // backgroundColor: "#fff",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/lottie/1360-grocery-shelf-lineal.json")}
        />
      </View>
      // <ActivityIndicator
      //   size="large"
      //   style={{
      //     position: "absolute",
      //     left: 0,
      //     right: 0,
      //     top: 0,
      //     bottom: 0,
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
      //   color="#E6AACE"
      //   // animating={loading}
      // />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>MarketPlaceScreen</Text>
    </View>
  );
};

export default MarketPlaceScreen;

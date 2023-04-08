import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const ProfileScreen = () => {
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
          speed={1.5}
          style={{
            width: 250,
            height: 250,
            // backgroundColor: "#fff",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/lottie/63822-searching-user-profile.json")}
          // source={{
          //   uri: "https://assets8.lottiefiles.com/private_files/lf30_wfox4afo.json",
          // }}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";

const TransferScreen = ({ navigation, route, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [toValue, setToValue] = useState("");
  const [wentToScan, setWentToScan] = useState(false);
  const [walletAddress, setWalletAddress] = useState(
    "0x64a7885CB27dc6C18096E97705C45C997d943240"
  );

  const handleApi = async () => {
    try {
      setLoading(true);
      let result = await fetch("https://randomuser.me/api?results=150");
      result = await result.json();
      if (result.results.length !== 0) {
        // console.log(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleQR = () => {
    navigation.navigate("QR");
  };
  const handleCancel = () => {
    setToValue("");
  };
  const handleSend = () => {
    navigation.navigate("MarketPlace");
  };
  useEffect(() => {
    handleApi();
    console.log(route.params);
    if (!route.params) {
      console.log(route.params.data);
      setWentToScan(true);
    }

    // setToValue(route.params.data.address);
  }, []);

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text>Loading.....</Text> */}
        <LottieView
          autoPlay
          speed={1}
          style={{
            width: 250,
            height: 250,
            // backgroundColor: "#fff",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          // source={require("../assets/lottie/55607-flying-wallet-money.json")}
          source={{
            uri: "https://assets5.lottiefiles.com/packages/lf20_se2DT5.json",
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // borderWidth: 1,
        margin: 17,
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleApi} />
      }
    >
      {/* Input section */}
      <View style={{ flex: 0.4 }}>
        <Text style={{ fontSize: 22, alignSelf: "center" }}>Send To</Text>
        {/* From section */}
        <View
          style={{
            flex: 0.3,
            margin: 2,
            // borderWidth: 0.5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            height: "100%",
          }}
        >
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "#90708c" }}>From:</Text>
          </View>
          <View
            style={{
              flex: 0.8,
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: "#B619A7",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 5,
              // alignItems: "center",
            }}
          >
            <TextInput
              placeholderTextColor={"#E6AACE"}
              style={{
                height: "100%",
                fontSize: 15,
                // borderWidth: 0.5,
                padding: 5,
                width: "100%",
              }}
              value={walletAddress}
              cursorColor={"#B619A7"}
              editable={false}
              clearButtonMode={"always"}
            />

            {/* <TouchableOpacity
              style={{
                flex: 0.2,
                // borderWidth: 0.5,
                padding: 5,
                marginRight: 5,
                alignItems: "flex-end",
              }}
              onPress={handleQR}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={25}
                color={"#B619A7"}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* To section */}
        <View
          style={{
            flex: 0.6,
            margin: 2,
            // borderWidth: 0.5,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            height: "100%",
          }}
        >
          {/* To section input part */}
          <View
            style={{ flex: 0.5, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ flex: 0.2, alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#90708c" }}>To:</Text>
            </View>

            <View
              style={{
                flex: 0.8,
                borderWidth: 0.5,
                borderRadius: 10,
                borderColor: "#B619A7",
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 5,
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Public address(0x) or scan"
                placeholderTextColor={"#E6AACE"}
                style={{
                  height: "100%",
                  fontSize: 15,
                  flex: 0.8,
                  // borderWidth: 0.5,
                  padding: 5,
                  // width: "90%",
                }}
                value={wentToScan ? route.params.data.address : ""}
                cursorColor={"#B619A7"}
              />

              <TouchableOpacity
                style={{
                  flex: 0.2,
                  // borderWidth: 0.5,
                  padding: 5,
                  marginRight: 5,
                  alignItems: "flex-end",
                }}
                onPress={handleQR}
              >
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={25}
                  color={"#B619A7"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* to section buttons part */}
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              // borderWidth: 0.5,
              justifyContent: "space-around",
              width: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                // backgroundColor: "#fff",
                flex: 0.5,
                borderWidth: 0.5,
                borderColor: "#AD40AF",
                padding: 15,
                margin: 5,
                borderRadius: 25,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  // textAlign: "center",
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#AD40AF",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSend}
              style={{
                flex: 0.5,
                backgroundColor: "#AD40AF",
                padding: 15,
                borderRadius: 25,
                alignItems: "center",
                margin: 5,
                // width: "50%",
              }}
            >
              <Text
                style={{
                  // textAlign: "center",
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recents section */}
      <View style={{ flex: 0.6 }}>
        <Text>Recents</Text>
      </View>
    </ScrollView>
  );
};

export default TransferScreen;

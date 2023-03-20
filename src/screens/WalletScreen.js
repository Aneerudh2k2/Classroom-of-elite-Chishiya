import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
// import { ethers } from "ethers";

const WalletScreen = () => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const qrRef = useRef();
  const [copiedText, setCopiedText] = React.useState("");

  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
  };

  // const walletAddress = async () => {
  //   const wallet = ethers.Wallet.createRandom();
  //   return wallet.address;
  // };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);

  const value = "0x64a7885CB27dc6C18096E97705C45C997d943240";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.5,
          // backgroundColor: "#E6AACE",
          margin: 5,
          width: "95%",
          justifyContent: "space-evenly",
          padding: 10,
        }}
      >
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 22, color: "#B619A7" }}>Wallet Details</Text>
        </View>

        <AnimatedTouchable
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderRadius: 30,
            elevation: 1,
          }}
          // onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}
        >
          <AnimatedImageBackground
            source={{
              uri: "https://img.freepik.com/free-photo/blue-abstract-gradient-wave-wallpaper_53876-108364.jpg?w=1380&t=st=1678389032~exp=1678389632~hmac=c6c573b33f561636233cb2afda8564458c5e490aa38e2e66576d33225d28f5d9",
            }}
            style={{
              ...flipToFrontStyle,
              flex: 1,
              height: "100%",
              width: "100%",
              // alignItems: "center",
              // position: "absolute",
            }}
            imageStyle={{ borderRadius: 30, padding: 5 }}
          >
            <View
              style={{
                flex: 0.25,
                // backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{ flex: 0.5, marginLeft: 15, marginTop: 20 }}>
                <MaterialCommunityIcons
                  name={"contactless-payment"}
                  size={23}
                  color={"#000"}
                />
              </View>

              <View
                style={{
                  flex: 0.5,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  // backgroundColor: "#B619A7",
                  padding: 10,
                  marginRight: 15,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#084c61", fontSize: 16 }}>Chishiya</Text>
              </View>
            </View>

            <View
              style={{
                flex: 0.75,
                // padding: 9,
                // backgroundColor: "#fff",
                flexDirection: "row",
              }}
            >
              {/* QR CODE for wallet address */}
              <View
                style={{
                  flex: 0.45,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <QRCode
                  value={JSON.stringify({
                    address: "0x64a7885CB27dc6C18096E97705C45C997d943240",
                  })}
                  size={125}
                  color="#084c61"
                  // backgroundColor="white"
                  getRef={qrRef}
                />
              </View>

              <View
                style={{
                  flex: 0.55,
                  justifyContent: "center",
                  // backgroundColor: "#fff",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 15 }}>Wallet Address</Text>

                <View
                  style={{
                    marginTop: 10,
                    borderWidth: 0.1,
                    borderRadius: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "center",
                      // alignItems: "center",
                      // backgroundColor: "#fff",
                    }}
                  >
                    <TextInput
                      value={value}
                      style={{ height: 22, width: "80%", fontSize: 8 }}
                      multiline={true}
                    />
                  </View>

                  <TouchableOpacity
                    style={{ justifyContent: "flex-end" }}
                    onPress={() => {
                      copyToClipboard(value);
                      alert("Copied");
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"content-copy"}
                      size={16}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </AnimatedImageBackground>
          {/* {!flipRotation ? (
            <AnimatedImageBackground
              source={{
                uri: "https://img.freepik.com/free-photo/blue-abstract-gradient-wave-wallpaper_53876-108364.jpg?w=1380&t=st=1678389032~exp=1678389632~hmac=c6c573b33f561636233cb2afda8564458c5e490aa38e2e66576d33225d28f5d9",
              }}
              style={{
                ...flipToBackStyle,
                height: "100%",
                width: "100%",
                alignItems: "center",
                position: "absolute",
              }}
              imageStyle={{ borderRadius: 30, padding: 5 }}
            >
              <View>
                <MaterialCommunityIcons
                  name={"contactless-payment"}
                  size={23}
                  color={"#000"}
                />
              </View>
            </AnimatedImageBackground>
          ) : (
            <AnimatedImageBackground
              source={{
                uri: "https://img.freepik.com/free-photo/blue-abstract-gradient-wave-wallpaper_53876-108364.jpg?w=1380&t=st=1678389032~exp=1678389632~hmac=c6c573b33f561636233cb2afda8564458c5e490aa38e2e66576d33225d28f5d9",
              }}
              style={{
                ...flipToFrontStyle,
                height: "100%",
                width: "100%",
                alignItems: "center",
                backfaceVisibility: "hidden",
              }}
              imageStyle={{ borderRadius: 30, padding: 5 }}
            >
              <Text>Back</Text>
            </AnimatedImageBackground>
          )} */}
        </AnimatedTouchable>
      </View>

      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          // backgroundColor: "#fff",
          width: "90%",
        }}
      >
        <View style={{ flex: 0.15, marginLeft: 15 }}>
          <Text style={{ fontSize: 22, color: "#B619A7" }}>
            Price Chart of JREX Token
          </Text>
        </View>

        <View
          style={{
            flex: 0.8,
            borderRadius: 20,
            elevation: 5,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/ethreum.png")}
            style={{ height: "90%", width: "100%" }}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletScreen;

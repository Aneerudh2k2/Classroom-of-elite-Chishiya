import {
  View,
  Text,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Keyboard,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import LottieView from "lottie-react-native";
// import { ethers } from "ethers";

const WalletScreen = ({ navigation }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);
  const qrRef = useRef();
  const [copiedText, setCopiedText] = React.useState("");
  const [balance, setBalance] = React.useState((0.0).toPrecision(3));
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState(
    "0x64a7885CB27dc6C18096E97705C45C997d943240"
  );

  const handleApi = async () => {
    try {
      setLoading(true);
      let result = await fetch("https://randomuser.me/api?results=150");
      result = await result.json();
      if (result.results.length !== 0) {
        console.log(result);
        setLoading(false);
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
          speed={3}
          style={{
            width: 100,
            height: 100,
            // backgroundColor: "#fff",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/lottie/55607-flying-wallet-money.json")}
        />
      </View>
    );
  }

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // const AnimatedImageBackground =
  //   Animated.createAnimatedComponent(ImageBackground);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleApi} />
      }
    >
      {console.log("Wallet screen")}
      {/* Card UI section */}
      <View
        style={{
          flex: 0.55,
          // backgroundColor: "#E6AACE",
          margin: 5,
          width: "95%",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View style={{ flex: 0.125, marginLeft: 15 }}>
          <Text style={{ fontSize: 20, color: "#B619A7" }}>Wallet Details</Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 0.875,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "60%",
            // borderRadius: 15,
            // padding: 5,
            // elevation: 1,
            // backgroundColor: "#E6AACE",
            // backgroundColor: "#fff",
            // borderRadius: 30,
            // elevation: 1,
          }}
          onPress={handleFlip}
        >
          {/* Card front */}
          <Animated.View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              backgroundColor: "#E6AACE",
              // backgroundColor: "#fff",
              borderRadius: 15,
              padding: 5,
              // elevation: 1,
              backfaceVisibility: "hidden",
              position: "absolute",
              transform: [
                {
                  rotateY: frontInterpolate,
                },
              ],
            }}
          >
            <View
              style={{
                flex: 0.1,
                // backgroundColor: "#000",
                width: "100%",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#f5e5fc",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                JREX Coin
              </Text>
            </View>

            <View
              style={{
                flex: 0.3,
                // backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flex: 0.625,
                  // backgroundColor: "#B619A7",
                  height: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  // padding: 10,
                  // marginRight: 15,
                  // marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/images/emv_chip.png")}
                  style={{
                    height: 40,
                    width: 40,
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </View>

              <View style={{ flex: 0.375, marginLeft: 10 }}>
                <MaterialCommunityIcons
                  name={"contactless-payment"}
                  size={23}
                  color={"#fff"}
                />
              </View>
            </View>

            <View
              style={{
                flex: 0.6,
                // padding: 9,
                // backgroundColor: "#fff",
              }}
            >
              {/* Username and wallet name */}
              <View
                style={{
                  flex: 0.8,
                  // justifyContent: "space-around",
                  alignItems: "center",
                  paddingTop: 5,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "900", color: "#fff" }}
                >
                  Chishiya
                </Text>
                <Text
                  style={{ fontSize: 12.5, fontWeight: "100", color: "#fff" }}
                >
                  Satoshi Nakamoto
                </Text>
              </View>

              {/* Tap or swipe to show qr code */}
              <View
                style={{ flex: 0.2, flexDirection: "row", paddingBottom: 5 }}
              >
                <View>
                  <Text
                    style={{ fontSize: 12.5, color: "#fff", fontWeight: "100" }}
                  >
                    Tap for wallet details{" "}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name={"gesture-tap"}
                  size={25}
                  color={"#fff"}
                />
              </View>
            </View>
          </Animated.View>

          {/* Card back */}
          <Animated.View
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                backgroundColor: "#E6AACE",
                // backgroundColor: "#fff",
                borderRadius: 15,
                padding: 5,
                // elevation: 1,
                backfaceVisibility: "hidden",
                position: "absolute",
              },
              {
                transform: [{ rotateY: "180deg" }],
                // backgroundColor: '#f0f0f0',
                backgroundColor: "#E6AACE",
              },
              {
                transform: [
                  {
                    rotateY: backInterpolate,
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                flex: 0.15,
                // backgroundColor: "#000",
                width: "100%",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#f5e5fc",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                JREX Coin
              </Text>
            </View>

            <View
              style={{
                flex: 0.75,
                // padding: 9,
                // backgroundColor: "#fff",
                alignItems: "center",
              }}
            >
              {/* QR CODE for wallet address */}
              <View
                style={{
                  flex: 0.55,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                  borderRadius: 4,
                  // width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                <QRCode
                  value={JSON.stringify({
                    walletAddress,
                  })}
                  size={110}
                  // color="#B619A7"
                  color="#000"
                  // backgroundColor="white"
                  getRef={qrRef}
                />
              </View>

              <View
                style={{
                  flex: 0.45,
                  justifyContent: "center",
                  // backgroundColor: "#fff",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 15, color: "#fff" }}>
                  Wallet Address
                </Text>

                <View
                  style={{
                    marginTop: 10,
                    // borderWidth: 0.1,
                    borderRadius: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "#fff",
                    backgroundColor: "#B619A7",
                    padding: 5,
                    // elevation: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "center",
                      // padding: 3,
                      // alignItems: "center",
                      // backgroundColor: "#fff",
                    }}
                  >
                    <TextInput
                      // onFocus={Keyboard.dismiss}
                      showSoftInputOnFocus={false}
                      value={walletAddress}
                      style={{
                        height: 25,
                        width: "100%",
                        fontSize: 9,
                        color: "#fff",
                      }}
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
                      size={20}
                      color={"#fff"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ flex: 0.1, flexDirection: "row", paddingBottom: 5 }}>
              <View>
                <Text
                  style={{ fontSize: 12.5, color: "#fff", fontWeight: "100" }}
                >
                  Tap for wallet card{" "}
                </Text>
              </View>
              <MaterialCommunityIcons
                name={"gesture-tap"}
                size={25}
                color={"#fff"}
              />
            </View>
          </Animated.View>

          {/* </AnimatedImageBackground> */}

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
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.45,
          justifyContent: "center",
          // alignItems: "center",
          // backgroundColor: "#fff",
          width: "90%",
        }}
      >
        <View style={{ flex: 0.15, marginLeft: 15, alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: "#B619A7" }}>
            Balance and History
          </Text>
        </View>

        <View
          style={{
            flex: 0.7,
            // borderWidth: 1,
            // borderRadius: 20,
            // elevation: 1,
            // backgroundColor: "#fff",
            margin: 13,
            justifyContent: "space-around",
            // alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../assets/images/Night_Fade.png")}
            borderRadius={15}
            style={{
              flex: 0.5,
              borderRadius: 15,
              elevation: 1,
              // paddingHorizontal: 15,
              // paddingVertical: 3,
              // paddingTop: 6,
              // justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.65,
                // alignItems: "center",
                // backgroundColor: "#ad40af",
                // justifyContent: "center",
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  flex: 0.3,
                  // backgroundColor: "#ad40af",
                  justifyContent: "center",
                  marginLeft: 15,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#fff", fontWeight: "600" }}
                >
                  Balance
                </Text>
              </View>

              <View
                style={{
                  flex: 0.6,
                  // backgroundColor: "#000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 27,
                    color: "#AD40AF",
                  }}
                >
                  JREX {balance}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 0.35,
                // backgroundColor: "#ad40af",
              }}
            >
              <LottieView
                autoPlay
                style={{
                  width: "100%",
                  height: "100%",
                  // backgroundColor: "#fff",
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../assets/lottie/298-coins-lineal.json")}
              />
            </View>
          </ImageBackground>
          {/* <Text>Balance</Text> */}

          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderRadius: 15,
              // backgroundColor: "#fff",
              // elevation: 1,
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                // borderWidth: 1,
                backgroundColor: "#E6AACE",
                // elevation: 1,
                padding: 4,
                paddingHorizontal: 10,
                borderRadius: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"plus"}
                size={30}
                color={"purple"}
              />
              <Text style={{ fontSize: 11, color: "#AD40AF" }}>TopUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // borderWidth: 1,
                backgroundColor: "#E6AACE",
                elevation: 1,
                padding: 4,
                paddingHorizontal: 12,
                borderRadius: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Transfer", { walletAddress });
              }}
            >
              <Feather name={"send"} size={30} color={"purple"} />
              <Text style={{ fontSize: 11, color: "#AD40AF" }}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // borderWidth: 1,
                backgroundColor: "#E6AACE",
                elevation: 1,
                padding: 4,
                paddingHorizontal: 10,
                borderRadius: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={"history"}
                size={30}
                color={"purple"}
              />
              <Text style={{ fontSize: 11, color: "#AD40AF" }}>History</Text>
            </TouchableOpacity>
          </View>
          {/* <Image
            source={require("../assets/images/ethreum.png")}
            style={{ height: "90%", width: "100%" }}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default WalletScreen;

import {
  ScrollView,
  View,
  Text,
  Animated,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Easing,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useState, useEffect, useRef } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import * as SecureStore from "expo-secure-store";

const TransferScreen = ({ navigation, route }) => {
  const txnListHeightAnimatedValue = useRef(new Animated.Value(0)).current;
  // const txnListHeightAnimatedValue = useRef({});
  const [amount, setAmount] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [toValue, setToValue] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [transactionData, settransactionData] = useState([
    {
      id: 1,
      username: "",
      "transactedAmount(in JREX)": 0.0,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": (0.0).toPrecision(8),
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
  ]);

  const data = [
    {
      id: 1,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 2,
      username: "Anee",
      "transactedAmount(in JREX)": -5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 3,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 4,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 5,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 6,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 7,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 8,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 9,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
    {
      id: 10,
      username: "Nishok",
      "transactedAmount(in JREX)": 5.23,
      date: new Date().toLocaleDateString(),
      "gasFee (in ETH)": 0.00005454,
      txnHash:
        "0x5f03f3ada259e2c44cc31a6df3ba108e9de87eb3348f3c4e2520ad54c70ccfc5",
      receiverWalletAddress: "0x6887246668a3b87F54DeB3b94Ba47a6f63F32985",
    },
  ];

  const handleApi = async () => {
    try {
      setLoading(true);
      let token = await SecureStore.getItemAsync("token");

      // let result = await fetch("https://randomuser.me/api?results=150");
      let result = await fetch(`http://192.168.43.99:3000/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        credentials: "same-origin",
      });
      result = await result.json();

      if (!result.success) {
        // console.log(result);
        setLoading(false);
        throw new Error(result.error);
      }
      setWalletAddress(result.walletDetails.address);
      setLoading(false);
    } catch (error) {
      Alert.alert(`ERROR: ${error.message}`);
      setLoading(false);
    }
  };

  const handleQR = () => {
    navigation.navigate("QR");
  };

  const handleCancel = () => {
    setToValue("");
  };

  const handleSend = async () => {
    // navigation.navigate("MarketPlace");

    try {
      setLoading(true);
      let token = await SecureStore.getItemAsync("token");
      let result = await fetch(
        `http://192.168.43.99:3000/jrexContract/transferJrex`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fromAddress: walletAddress,
            toAddress: toValue,
            amount,
          }),
          mode: "cors",
          credentials: "same-origin",
        }
      );

      result = await result.json();

      if (!result.success) {
        // console.log(result);
        setLoading(false);
        throw new Error(result.error);
      }

      Alert.alert(
        "Transaction Summary!",
        `From ${walletAddress}\n To ${toValue}\n Amount ${amount}\n sent successful`
      );
      setLoading(false);
      setToValue("");
      setAmount("");
    } catch (error) {
      Alert.alert(`ERROR: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  useEffect(() => {
    console.log(route.params);
    if (route.params && route.params.data) {
      console.log("To value: ", route.params.data);
      setToValue(route.params.data.address);
    }

    if (route.params && route.params.walletAddress) {
      console.log("From Value: ", route.params.walletAddress);
      setWalletAddress(route.params.walletAddress);
    }
  }, [route.params]);

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

  const handleTxnDetailPress = (id) => {
    // setShowMoreToggle(!showMoreToggle);
    if (expandedId === id) {
      setExpandedId(null);
      Animated.timing(txnListHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
        // easing: Easing.inOut(Easing.linear),
      }).start();
    } else {
      setExpandedId(id);
      Animated.timing(txnListHeightAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
        // easing: Easing.inOut(Easing.linear),
      }).start();
    }
  };

  const Transaction = ({ item, index }) => {
    const isExpanded = item.id === expandedId;
    const heightInterpolation = txnListHeightAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 140],
    });

    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#fff",
          elevation: 0.5,
          margin: 5,
          padding: 5,
        }}
      >
        {/* username and currency section */}
        <View
          style={{
            flex: 0.4,
            flexDirection: "row",
            padding: 10,
            // borderWidth: 0.5,
          }}
        >
          {/* Username */}
          <View style={{ flex: 0.4, flexDirection: "row" }}>
            <Text style={{ fontFamily: "Montserrat" }}>{item.username}</Text>
            <Text style={{ fontFamily: "Montserrat", fontSize: 13 }}>
              {" "}
              (
              {item.receiverWalletAddress.substring(0, 5) +
                "..." +
                item.receiverWalletAddress.substring(
                  item.receiverWalletAddress.length - 5
                )}
              )
            </Text>
          </View>

          {/* Currency token part */}
          <View style={{ flex: 0.6, alignItems: "flex-end" }}>
            <Text
              style={{
                color:
                  item["transactedAmount(in JREX)"] < 0 ? "red" : "#10b881",
                fontFamily: "Montserrat",
              }}
            >
              {`${item["transactedAmount(in JREX)"] < 0 ? "" : "+"} ${
                item["transactedAmount(in JREX)"]
              }`}{" "}
              JREX
            </Text>
          </View>
        </View>

        {/* Date and toggle section */}
        <View
          style={{
            flex: 0.4,
            // borderWidth: 0.5,
            padding: 3,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {/*date part  */}
          <View
            style={{
              flex: 0.5,
              // alignItems: "center",
              // borderWidth: 0.5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.65,
                marginHorizontal: 5,
                padding: 8,
                borderRadius: 5,
                backgroundColor: "#ccd",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "grey", fontFamily: "Montserrat" }}>
                {item.date}
              </Text>
            </View>
          </View>

          {/*toggle button part  */}
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => {
                handleTxnDetailPress(item.id);
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 12,
                  fontFamily: "Montserrat",
                }}
              >
                Txn details
              </Text>
              <>
                {isExpanded ? (
                  <AntDesign name="up" size={15} color="grey" />
                ) : (
                  <AntDesign name="down" size={15} color="grey" />
                )}
              </>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View
          style={{
            // height: txnListHeightAnimatedValue,
            height: heightInterpolation,
            marginHorizontal: 10,
            marginVertical: 5,
            display: isExpanded ? "flex" : "none",
          }}
        >
          {isExpanded && (
            <View style={{ flex: 1 }}>
              {/* // Gas fee section */}
              <View
                style={{
                  flex: 0.2,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/images/gas_fee.png")}
                  style={{
                    height: 16,
                    width: 16,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "grey",
                    fontFamily: "Montserrat",
                  }}
                >
                  {"  "}Fee {item["gasFee (in ETH)"]} ETH
                </Text>
              </View>

              {/* //hash and address part */}
              <View
                style={{ flex: 0.8, width: "80%", justifyContent: "center" }}
              >
                {/* hash part */}
                <View style={{ flex: 0.5, margin: 3 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "grey",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Transaction Hash
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "skyblue",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {item.txnHash.substring(0, 6) +
                      "........" +
                      item.txnHash.substring(item.txnHash.length - 7)}
                  </Text>
                </View>
                {/* // walleAddress part */}
                <View style={{ flex: 0.5, margin: 3 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "grey",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Wallet Address
                  </Text>

                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      copyToClipboard(item.receiverWalletAddress);
                      Alert.alert(
                        "Info!",
                        `${item.username}'s wallet addres copied`
                      );
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "skyblue",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {item.receiverWalletAddress.substring(0, 5) +
                        "........" +
                        item.receiverWalletAddress.substring(
                          item.receiverWalletAddress.length - 5
                        )}
                      {"  "}
                    </Text>
                    <MaterialCommunityIcons
                      name={"content-copy"}
                      size={16}
                      color={"grey"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    );
  };

  const TransactionList = () => {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Transaction item={item} index={index} />
        )}
        keyExtractor={(txn) => txn.id.toString()}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={handleApi} />
        // }
      />
    );
  };

  return (
    <View style={{ flex: 1, margin: 10 }}>
      {/* Input section container */}
      <View style={{ flex: 0.5, margin: 17 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            // justifyContent: "center",
            // alignItems: "center",
            // borderWidth: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleApi} />
          }
        >
          {/* Input section */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 22,
                alignSelf: "center",
                fontFamily: "Montserrat",
              }}
            >
              Send To
            </Text>
            {/* From section */}
            <View
              style={{
                flex: 0.25,
                margin: 2,
                // borderWidth: 0.5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // paddingHorizontal: 8,
                height: "100%",
              }}
            >
              <View style={{ flex: 0.3, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#90708c",
                    fontFamily: "Montserrat",
                  }}
                >
                  From:
                </Text>
              </View>
              <View
                style={{
                  flex: 0.7,
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
                flex: 0.75,
                margin: 2,
                // borderWidth: 0.5,
                justifyContent: "space-between",
                alignItems: "center",
                // paddingHorizontal: 8,
                height: "100%",
              }}
            >
              {/* To section input part */}
              <View
                style={{
                  flex: 0.5,
                  // borderWidth: 0.5,
                  margin: 2,
                  // borderWidth: 0.5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  height: "100%",
                }}
              >
                <View style={{ flex: 0.3, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#90708c",
                      fontFamily: "Montserrat",
                    }}
                  >
                    To:
                  </Text>
                </View>

                <View
                  style={{
                    flex: 0.7,
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
                      width: "100%",
                    }}
                    value={toValue}
                    onChangeText={setToValue}
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

              {/* to section amount part */}
              <View
                style={{
                  flex: 0.5,
                  margin: 2,
                  // borderWidth: 0.5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  height: "100%",
                }}
              >
                <View style={{ flex: 0.3, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#90708c",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Amount:
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.7,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: "#B619A7",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingVertical: 5,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    placeholder={"Enter Amount here"}
                    placeholderTextColor={"#E6AACE"}
                    style={{
                      height: "100%",
                      fontSize: 15,
                      // flex: 0.8,
                      // borderWidth: 0.5,
                      padding: 5,
                      width: "100%",
                    }}
                    value={amount}
                    onChangeText={setAmount}
                    cursorColor={"#B619A7"}
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

              {/*  buttons section */}
              <View
                style={{
                  flex: 0.6,
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
                      fontFamily: "Montserrat",
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
                      fontFamily: "Montserrat",
                    }}
                  >
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Recents section */}
      <View style={{ flex: 0.5, margin: 17 }}>
        <View style={{ flex: 0.125, marginBottom: 5 }}>
          <Text style={{ fontSize: 16, fontFamily: "Montserrat" }}>
            Recent address and transactions
          </Text>
        </View>

        {/* transaction List part */}
        <View style={{ flex: 0.875 }}>
          <TransactionList />
        </View>
      </View>
    </View>
  );
};

export default TransferScreen;

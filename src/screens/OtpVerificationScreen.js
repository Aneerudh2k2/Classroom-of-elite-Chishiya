import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../components/CustomButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";

const NavBar = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 3,
        paddingHorizontal: 3,
        // backgroundColor: "#fefefe",
        // marginTop: 30,
      }}
    >
      <TouchableOpacity
        style={{ margin: 3, paddingLeft: 15, width: 45, flex: 0.1 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign
          name="arrowleft"
          size={26}
          color="#000"
          style={{ marginRight: 6 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 0.8,
          // backgroundColor: "#002D6B",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "Montserrat" }}>OTP</Text>
      </View>
    </View>
  );
};

const OTPImageBanner = () => {
  return (
    <View
      style={{
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#CC9FB5",
      }}
    >
      <Image
        source={require("../assets/images/Two-factor-authentication-rafiki.png")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

const OtpVerificationScreen = ({ navigation, route }) => {
  const code1Ref = useRef();
  const code2Ref = useRef();
  const code3Ref = useRef();
  const code4Ref = useRef();
  const code5Ref = useRef();
  const code6Ref = useRef();
  let code = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    code1Ref.current.focus();
  }, []);

  const handleVerification = async () => {
    try {
      setLoading(true);
      console.log({ code, signinup: route.params.signinup });

      let verifyOTP = await fetch(`http://192.168.43.99:3000/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: route.params.signinup.from,
          OTP: code,
          name: route.params.signinup.name,
          email: route.params.signinup.email,
          OTPresult: route.params.signinup.OTPresult,
          token: route.params.signinup.token,
          walletDetails: route.params.signinup.walletDetails,
        }),
        mode: "cors",
        credentials: "same-origin",
      });

      verifyOTP = await verifyOTP.json();

      if (!verifyOTP.success) {
        setLoading(false);
        throw new Error(verifyOTP.error);
      }

      // save the auth token to secure store
      await SecureStore.setItemAsync(
        "token",
        route.params.signinup.from === "Login"
          ? verifyOTP.newToken
          : verifyOTP.user.token
      );

      navigation.navigate("App", { screen: "Wallet", params: verifyOTP.user });
      setLoading(false);
    } catch (error) {
      Alert.alert(`ERROR: ${error.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        color="#B619A7"
        // animating={loading}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        // marginVertical: 1,
        backgroundColor: "#fff",
      }}
    >
      <NavBar navigation={navigation} route={route} />
      <OTPImageBanner />

      <View
        style={{
          flex: 0.5,
          // backgroundColor: "#CC9FB5",
          padding: 25,
          justifyContent: "space-around",
        }}
      >
        {/* textual part */}
        <View
          style={{
            flex: 0.3,
            alignItems: "center",
            justifyContent: "space-around",
            // backgroundColor: "#AD40AF",
          }}
        >
          <Text
            style={{ fontSize: 25, fontWeight: 600, fontFamily: "Montserrat" }}
          >
            Verification Code
          </Text>
          <Text stye={{ fontSize: 15, fontFamily: "Montserrat" }}>
            We have sent OTP to your Email address
          </Text>
          <Text
            style={{
              fontWeight: 600,
              color: "#AD40AF",
              fontFamily: "Montserrat",
            }}
          >
            {route.params.signinup.email}
          </Text>
        </View>

        {/* input part */}
        <View style={{ flex: 0.3 }}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextInput
              ref={code1Ref}
              maxLength={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center",
                // padding: 15,
                fontSize: 20,
                height: 52,
                width: "11%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#CC9FB5",
              }}
              cursorColor={"#AD40AF"}
              keyboardType={"numeric"}
              value={code[0]}
              onChangeText={(code1) => {
                code.push(code1);
                if (code1 != "") {
                  code2Ref.current.focus();
                }
              }}
            />

            <TextInput
              ref={code2Ref}
              maxLength={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 52,
                width: "11%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#CC9FB5",
              }}
              cursorColor={"#AD40AF"}
              keyboardType={"numeric"}
              value={code[1]}
              onChangeText={(code2) => {
                code.push(code2);
                if (code2 != "") {
                  code3Ref.current.focus();
                }
              }}
            />
            <TextInput
              ref={code3Ref}
              maxLength={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 52,
                width: "11%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#CC9FB5",
              }}
              cursorColor={"#AD40AF"}
              keyboardType={"numeric"}
              value={code[2]}
              onChangeText={(code3) => {
                code.push(code3);
                if (code3 != "") {
                  code4Ref.current.focus();
                }
              }}
            />
            <TextInput
              ref={code4Ref}
              maxLength={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 52,
                width: "11%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#CC9FB5",
              }}
              cursorColor={"#AD40AF"}
              keyboardType={"numeric"}
              value={code[3]}
              onChangeText={(code4) => {
                code.push(code4);
                if (code4 != "") {
                  code5Ref.current.focus();
                }
              }}
            />
            <TextInput
              ref={code5Ref}
              maxLength={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 52,
                width: "11%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#CC9FB5",
              }}
              cursorColor={"#AD40AF"}
              keyboardType={"numeric"}
              value={code[4]}
              onChangeText={(code5) => {
                code.push(code5);
                if (code5 != "") {
                  code6Ref.current.focus();
                }
              }}
            />
            <TextInput
              ref={code6Ref}
              maxLength={1}
              style={{
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 20,
                height: 52,
                width: "11%",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#CC9FB5",
              }}
              cursorColor={"#AD40AF"}
              keyboardType={"numeric"}
              value={code[5]}
              onChangeText={(code6) => {
                code.push(code6);
                if (code6 != "") {
                }
              }}
            />
          </View>
        </View>

        {/* Verify button part */}
        <View style={{ flex: 0.4 }}>
          <CustomButton label={"Verify"} onPress={handleVerification} />
        </View>
      </View>
    </View>
  );
};

export default OtpVerificationScreen;

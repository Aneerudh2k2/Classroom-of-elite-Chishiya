import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import DatePicker from "react-native-date-picker";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

// import RegistrationSVG from "../assets/images/registration.svg";
// import GoogleSVG from "../assets/images/google.svg";
// import FacebookSVG from "../assets/images/facebook.svg";
// import TwitterSVG from "../assets/images/twitter.svg";

const RegisterScreen = ({ navigation }) => {
  // const [date, setDate] = React.useState(new Date());
  // const [open, setOpen] = React.useState(false);
  // const [dobLabel, setDobLabel] = React.useState("Date of Birth");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegisterButton = async () => {
    try {
      setLoading(true);
      if (name === "" || email === "") {
        Alert.alert("Please provide all the details!!");
        setLoading(false);
      }
      let signinup = await fetch(`http://192.168.43.99:3000/signinup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
        mode: "cors",
        credentials: "same-origin",
      });

      signinup = await signinup.json();

      if (!signinup.success) {
        setLoading(false);
        throw new Error(signinup.error);
      }

      navigation.navigate("OTP", {
        signinup,
      });
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 20 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 300, width: 300 }}
            source={require("../assets/images/Mobile-login-rafiki.png")}
          />
        </View>

        <Text
          style={{
            // fontFamily: "Roboto-Medium",
            fontFamily: "Montserrat",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, register with email ...
        </Text> */}

        {/* <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        /> */}

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder={"Full Name"}
            style={{ flex: 1, paddingVertical: 0 }}
            cursorColor={"#AD40AF"}
            caretHidden={false}
            value={name}
            onChangeText={setName}
          />

          {/* <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity> */}
        </View>

        {/* <InputField
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        /> */}

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder={"Email ID"}
            style={{ flex: 1, paddingVertical: 0 }}
            cursorColor={"#AD40AF"}
            caretHidden={false}
            keyboardType={"email-address"}
            value={email}
            onChangeText={setEmail}
          />

          {/* <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity> */}
        </View>
        {/* <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        /> */}

        {/* <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text
              style={{
                color: "#666",
                marginLeft: 5,
                marginTop: 5,
                fontFamily: "Montserrat",
              }}
            >
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={"date"}
          maximumDate={new Date("2005-01-01")}
          minimumDate={new Date("1980-01-01")}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <CustomButton label={"Register"} onPress={handleRegisterButton} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ fontFamily: "Montserrat" }}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: "#AD40AF",
                fontWeight: "700",
                fontFamily: "Montserrat",
              }}
            >
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

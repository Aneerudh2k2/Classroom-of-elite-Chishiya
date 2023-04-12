import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const MarketPlaceScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const foodOfferData = [
    {
      id: 1,
      title:
        "Free coffee or Tea on purchasing Podi Dosai combo With JREX token",
      coverPhoto: require("../assets/images/masala_dosa.jpg"),
      couponCode: "PODI20CFE",
      redeemableAmount: "100%",
      validity: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "Buy 1 Sandwich @FC get 1 French Fries free",
      coverPhoto: require("../assets/images/sandwich_fries.jpg"),
      couponCode: "FCB1G1",
      redeemableAmount: "100%",
      validity: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: "10% off on any purchase on @FC middle shop",
      coverPhoto: require("../assets/images/samsosa_pani_puri.jpg"),
      couponCode: "SAMPURI10",
      redeemableAmount: "10%",
      validity: new Date().toLocaleDateString(),
    },
    {
      id: 4,
      title: "20% off on Juices and milkshake @FC",
      coverPhoto: require("../assets/images/juices.jpg"),
      couponCode: "SAMPURI10",
      redeemableAmount: "10%",
      validity: new Date().toLocaleDateString(),
    },
  ];

  const stationeryOfferData = [
    {
      id: 1,
      title: "First year math booklet 20% off limited time deal",
      coverPhoto: require("../assets/images/math_book.jpg"),
      couponCode: "MATH20",
      redeemableAmount: "20%",
      validity: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "Library fine reduced upto 50",
      coverPhoto: require("../assets/images/library_book.jpg"),
      couponCode: "FINE50LIB",
      redeemableAmount: "50 JREX",
      validity: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: "Free Answer sheets for next upcoming CAT internals!!",
      coverPhoto: require("../assets/images/answer_sheets.jpg"),
      couponCode: "CATFREE",
      redeemableAmount: "100%",
      validity: new Date().toLocaleDateString(),
    },
  ];

  const eventsOfferData = [
    {
      id: 1,
      title: "Free pass on any event on Tech Utsav",
      coverPhoto: require("../assets/images/tech_event.jpg"),
      couponCode: "TECHUSVFREE",
      redeemableAmount: "100%",
      validity: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "50% discount on Exam fees on Regular Coders club Participation",
      coverPhoto: require("../assets/images/coding_club.jpg"),
      couponCode: "REGWIN50CC",
      redeemableAmount: "50%",
      validity: new Date().toLocaleDateString(),
    },
  ];

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

  const OfferItems = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, borderRadius: 15, elevation: 1, margin: 10 }}
        onPress={() =>
          navigation.navigate("Offer", {
            params: item,
          })
        }
      >
        <ImageBackground
          source={item.coverPhoto}
          borderRadius={15}
          fadeDuration={100}
          style={{ flex: 1, height: 300, width: 250, padding: 6 }}
        >
          <View>
            <Text style={{ color: "#fff" }}>{item.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        position: "relative",
        margin: 18,
      }}
      // style={{ flex: 1, margin: 18, overflow: "scroll" }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleApi} />
      }
    >
      {/* Rewards and balance banner */}
      <View style={{ flexGrow: 0.3 }}>
        {/* Rewards text section */}
        <View style={{ flex: 0.3, margin: 5 }}>
          <Text style={{ fontSize: 30 }}>Rewards</Text>
        </View>

        {/* tokens section */}
        <View
          style={{
            flex: 0.7,
            margin: 5,
            // backgroundColor: "#ffafcc",
            backgroundColor: "#fff",
            elevation: 1,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* token and balance */}
          <View
            style={{
              // flex: 0.9,
              // borderWidth: 0.5,
              flexDirection: "row",
              margin: 5,
              padding: 6,
            }}
          >
            {/* Balance section */}
            <View
              style={{
                flex: 0.6,
                margin: 3,
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 13, color: "#90708c", fontWeight: "200" }}
              >
                Total Tokens
              </Text>
              <Text style={{ fontSize: 20, color: "#ea4c89" }}>0.00 JREX</Text>
              <Text
                style={{ fontSize: 11, color: "#90708c", fontWeight: "400" }}
              >
                Lifetime Tokens earned 0.00 JREX{" "}
              </Text>
            </View>

            {/* earn token for participation section */}
            <View
              style={{
                flex: 0.4,
                margin: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  padding: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ea4c89",
                }}
                onPress={() =>
                  Alert.alert(
                    "info!",
                    "Participate more events in our college, win them to earn JREX tokens"
                  )
                }
              >
                <Text style={{ color: "#fff" }}>Earn Tokens</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Trending offers and vouchers */}
      <View style={{ flex: 0.7, margin: 5, marginBottom: 10 }}>
        {/* trending offers */}
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            // borderWidth: 0.5,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Image
            source={require("../assets/images/price-tag.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text style={{ fontSize: 20, marginLeft: 5 }}>
            {" "}
            Trending offers for you
          </Text>
        </View>

        {/* Offer by category */}
        <View style={{ flex: 0.9 }}>
          {/* Food */}
          <View style={{ flex: 0.5, overflow: "scroll" }}>
            <View
              style={{
                flex: 0.25,
                flexDirection: "row",
                // borderWidth: 0.5,
                padding: 6,
                margin: 3,
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <View style={{ flex: 0.1 }}>
                <Image
                  source={require("../assets/images/hamburger.png")}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <View style={{ flex: 0.9, marginLeft: 5 }}>
                <Text style={{ fontSize: 15 }}>Foods and Snacks</Text>
                <Text style={{ fontSize: 12, color: "grey" }}>
                  Popular offer for you
                </Text>
              </View>
            </View>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={foodOfferData}
              renderItem={({ item }) => <OfferItems item={item} />}
              style={{ flex: 1 }}
              horizontal={true}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={handleApi} />
              }
            />
          </View>

          {/* Stationery */}
          <View style={{ flex: 0.5, overflow: "scroll" }}>
            <View
              style={{
                flex: 0.25,
                flexDirection: "row",
                // borderWidth: 0.5,
                padding: 6,
                margin: 3,
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <View style={{ flex: 0.1 }}>
                <Image
                  source={require("../assets/images/stationery.png")}
                  style={{ height: 32, width: 32 }}
                />
              </View>
              <View style={{ flex: 0.9, marginLeft: 5 }}>
                <Text style={{ fontSize: 15 }}>Stationeries</Text>
                <Text style={{ fontSize: 12, color: "grey" }}>
                  Popular offer for you
                </Text>
              </View>
            </View>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={stationeryOfferData}
              renderItem={({ item }) => <OfferItems item={item} />}
              style={{ flex: 1 }}
              horizontal={true}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={handleApi} />
              }
            />
          </View>

          {/* Offers on Event registration */}
          <View style={{ flex: 0.5, overflow: "scroll" }}>
            <View
              style={{
                flex: 0.25,
                flexDirection: "row",
                // borderWidth: 0.5,
                padding: 6,
                margin: 3,
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <View style={{ flex: 0.1 }}>
                <Image
                  source={require("../assets/images/events_activities.png")}
                  style={{ height: 32, width: 32 }}
                />
              </View>
              <View style={{ flex: 0.9, marginLeft: 5 }}>
                <Text style={{ fontSize: 15 }}>
                  More on Events and Activities
                </Text>
                <Text style={{ fontSize: 12, color: "grey" }}>
                  Popular offer for you
                </Text>
              </View>
            </View>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={eventsOfferData}
              renderItem={({ item }) => <OfferItems item={item} />}
              style={{ flex: 1 }}
              horizontal={true}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={handleApi} />
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MarketPlaceScreen;

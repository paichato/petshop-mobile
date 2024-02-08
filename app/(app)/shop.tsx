import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import theme from "../../styles/theme";
import { Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";

interface IProduct {
  description: string;
  color?: string[];
  type: "product" | "dog" | "service";
  stars: number;
  price: number;
  title: string;
  img: string;
  merchant: string;
}

export default function Shop() {
  const { colors } = theme;
  const router = useRouter();

  const ShopItem = ({
    img = require("../../assets/images/pet-belt.png"),
    type = "product",
  }) => {
    return (
      <TouchableOpacity
        style={{
          width: wp(42),
          marginTop: 40,
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "800" }}>Happy Colar</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            width: "60%",
          }}
        >
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star" size={14} color={colors.main_sec} />
        </View>
        <Image
          source={img}
          style={{
            width: "100%",
            height: 150,
            backgroundColor: colors.bg_primary,
            borderRadius: 10,
          }}
          resizeMode="contain"
        />
        <Text style={{ color: colors.text }}>
          Keep your dog teeth healthy and cleanwith the Nerf dogs sp...
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{ borderRadius: 5, color: colors.text, fontWeight: "300" }}
          >
            Marca:
          </Text>
          <Text
            style={{
              borderRadius: 5,
              color: colors.main_sec,
              fontWeight: "300",
            }}
          >
            Kuluka
          </Text>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: colors.main_sec,
                fontSize: 22,
                fontWeight: "900",
              }}
            >
              14.000
            </Text>
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "300" }}
            >
              .00MZN
            </Text>
          </View>

          <View></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 20,
      }}
    >
      <Text>Shop</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Octicons name="apps" size={24} color={colors.header} />
        <Octicons name="credit-card" size={24} color={colors.header} />
      </View>

      <View>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Products</Text>
        <Text style={{ fontSize: 22, color: colors.main_sec }}>{`(200)`}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <ShopItem />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem />
        <ShopItem />
        <ShopItem />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          backgroundColor: colors.main_sec,
          padding: 10,
          borderRadius: 100,
        }}
      >
        <Octicons name="filter" size={24} color={colors.white} />
      </View>
    </SafeAreaView>
  );
}

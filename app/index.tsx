import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../styles/theme";
import { Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import MainContainer from "../components/MainContainer";

export default function Onboarding() {
  const { colors } = theme;
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 40,
      }}
    >
      <Text
        style={{ alignSelf: "flex-start", marginTop: 20, fontWeight: "800" }}
      >
        Doguinho
      </Text>
      {/* <Image source={require('../../assets/images/Puppy2.png')} style={{height:hp(60)}} resizeMode='contain' /> */}
      <LottieView
        autoPlay
        loop={true}
        style={{
          //   width: 60,
          height: hp(50),
        }}
        source={require("../assets/lotties/122299-dog-pet-.json")}
      />

      <View>
        <Text style={{ fontSize: 34, fontWeight: "800", color: colors.header }}>
          Encontre seu <Text style={{ color: colors.main_sec }}>doguinho</Text>{" "}
          conosco
        </Text>
        <Text style={{ lineHeight: 24, color: colors.text, marginTop: 10 }}>
          Encontre o melhor animal e serviços vetrinários próximos de si.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("screens/loginAccount")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.main,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          width: wp(40),
          justifyContent: "space-around",
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", color: colors.white }}>
          Entrar
        </Text>
        <Octicons name="chevron-right" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

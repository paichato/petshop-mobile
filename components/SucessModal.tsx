import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import theme from "../styles/theme";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "./CustomText";
import FONTS, { AVAILABLE_FONTS } from "../constants/FONTS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";

export default function SucessModal({
  title = "Opah...",
  txt = "Usuário não existe ou senha inválida",
  isDisabled = false,
  action,
  btnText = "Confirmar",
  align = true,
  lottie = false,
}) {
  const colors = theme.colors;

  return (
    <View
      style={{
        // width: "40%",
        height: "40%",
        aspectRatio: 1,
        elevation: 3,
        backgroundColor: colors.white,
        flex: 1,
        padding: wp("10%"),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {lottie ? (
        <LottieView
          autoPlay
          loop={false}
          style={{
            height: hp(10),
          }}
          source={require("../assets/lotties/check-lottie.json")}
        />
      ) : (
        <AntDesign name="checkcircle" size={hp("10%")} color={colors.sucess} />
      )}
      <View style={{ alignItems: "center", marginTop: hp("5%") }}>
        <CustomText
          color={colors.text_dark}
          font={FONTS.Bold}
          fontSize={22}
          txt={title}
        />
        <CustomText
          color={colors.text}
          fontSize={16}
          txt={txt}
          styles={{ textAlign: align }}
        />
      </View>
      <TouchableOpacity
        onPress={action}
        disabled={isDisabled}
        style={{
          borderRadius: 10,
          backgroundColor: isDisabled ? colors.line : colors.sucess,
          padding: 10,
          width: wp("30%"),
          alignItems: "center",
          justifyContent: "center",
          marginTop: hp("5%"),
        }}
      >
        <CustomText
          txt={btnText}
          font={AVAILABLE_FONTS.Medium}
          fontSize={14}
          color={isDisabled ? colors.text_dark : colors.white}
        />
        {isDisabled && <ActivityIndicator size={"small"} color={"white"} />}
      </TouchableOpacity>
    </View>
  );
}

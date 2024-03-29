import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../styles/theme";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "./CustomText";
import FONTS, { AVAILABLE_FONTS } from "../constants/FONTS";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ErrorModal({
  title = "Opah...",
  txt = "Usuário não existe ou senha inválida",
  align = false,
  btn = false,
  btnText = "Tentar novamente",
  action,
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
      <AntDesign name="closecircle" size={hp("10%")} color="red" />
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
          styles={align && { textAlign: "center" }}
        />
      </View>
      {btn && (
        <TouchableOpacity
          onPress={action}
          style={{
            borderRadius: 10,
            backgroundColor: "red",
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
            color={colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

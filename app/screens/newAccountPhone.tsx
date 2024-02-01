import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../../styles/theme";
import { Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import FONTS, { AVAILABLE_FONTS } from "../../constants/FONTS";
import MainContainer from "../../components/MainContainer";

export default function NewAccountPhone() {
  const { colors } = theme;
  const router = useRouter();

  const options = [
    { id: 0, key: "sms", value: "SMS" },
    { id: 1, key: "whatsapp", value: "Whatsapp" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <MainContainer>
      <View style={{ width: "100%", marginTop: 20 }}>
        <CustomText
          txt="Criar conta"
          font={AVAILABLE_FONTS.SemiBold}
          fontSize={32}
        />
        {/* <CustomText txt='Um código OTP de verificção será enviado para o seu número de celular' color={colors.text_detail} fontSize={16} font={AVAILABLE_FONTS.Regular} /> */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {options.map((item, i) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              style={{
                borderRadius: 10,
                backgroundColor:
                  selectedOption.id === i
                    ? colors.main_sec_10
                    : colors.bg_primary,
                padding: 10,
              }}
            >
              <CustomText
                txt={item.value}
                font={AVAILABLE_FONTS.Medium}
                fontSize={14}
                color={
                  selectedOption.id === i
                    ? colors.text_dark
                    : colors.text_detail
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <CustomText
            txt="Número de celular"
            font={AVAILABLE_FONTS.Medium}
            fontSize={14}
            color={colors.text_detail}
          />
          <View
            style={{
              backgroundColor: colors.line,
              width: "100%",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
              marginTop: 10,
            }}
          >
            <CustomText
              txt="🇲🇿 "
              font={AVAILABLE_FONTS.Medium}
              fontSize={14}
              color={colors.text_detail}
            />
            <CustomText
              txt="+258"
              font={AVAILABLE_FONTS.Medium}
              fontSize={14}
              color={colors.text_detail}
            />

            <TextInput
              placeholder="821010100"
              style={{
                padding: 10,
                fontSize: 14,
                fontFamily: AVAILABLE_FONTS.Bold,
                alignSelf: "center",
                height: "100%",
                width: "100%",
                color: colors.text_dark,
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("screens/newAccountDetails")}
          style={{
            borderRadius: 10,
            backgroundColor: colors.main_sec,
            padding: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <CustomText
            txt="Avançar"
            font={AVAILABLE_FONTS.SemiBold}
            fontSize={14}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 1,
        }}
      >
        <View
          style={{ width: "40%", height: 2, backgroundColor: colors.line }}
        ></View>
        <CustomText
          txt="OU"
          color={colors.text_detail}
          font={AVAILABLE_FONTS.SemiBold}
        />
        <View
          style={{ width: "40%", height: 2, backgroundColor: colors.line }}
        ></View>
      </View>

      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: colors.bg_primary,
            padding: 10,
            alignItems: "center",
            marginTop: 20,
            borderColor: colors.line,
            borderWidth: 2,
          }}
        >
          <CustomText
            txt="Esquecei senha"
            font={AVAILABLE_FONTS.Regular}
            fontSize={14}
            color={colors.text_dark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("screens/loginAccount")}
          style={{
            borderRadius: 10,
            backgroundColor: colors.text_dark,
            padding: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <CustomText
            txt="Iniciar sessão"
            font={AVAILABLE_FONTS.Regular}
            fontSize={14}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
}

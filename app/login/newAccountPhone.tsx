import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
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
import api from "../../services/api";
import { IS_PHONE_INVALID } from "../../utils/util";
import { Modalize } from "react-native-modalize";
import ErrorMessage from "../../components/ErrorMessage";
import ErrorModal from "../../components/ErrorModal";
import { AntDesign } from "@expo/vector-icons";

export default function NewAccountPhone() {
  const { colors } = theme;
  const router = useRouter();

  const options = [
    { id: 0, key: "sms", value: "SMS" },
    { id: 1, key: "whatsapp", value: "Whatsapp" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [phonenumber, setPhonenumber] = useState("");
  const [errorField, setErrorField] = useState("");
  const [errorRes, setErrorRes] = useState("");
  const [errorOTP, setErrorOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<any>(0);

  const modalizeRef = useRef<Modalize>(null);
  const confirmRef = useRef<Modalize>(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onOpenConfirm = () => {
    confirmRef.current?.open();
  };

  const handlePhoneValidation = async () => {
    return router.push("login/newAccountDetails");

    if (IS_PHONE_INVALID(phonenumber)) {
      setErrorField("Numero invalido");
      return;
    }
    Keyboard.dismiss();
    setIsLoading(true);
    api
      .get(`/find-user/${phonenumber}`)
      .then((res) => {
        setErrorRes("Usuario invalido ou indisponivel. \nTente outro!");
        onOpen();
      })
      .catch((err) => {
        console.log(err);
        onOpenConfirm();
      })
      .finally(() => setIsLoading(false));
  };

  const handleWhatsappCode = async () => {
    setIsLoadingOTP(true);
    let newCode = Math.floor(Math.random() * 1000000);
    setGeneratedCode(newCode);

    await api
      .post(`/sendcode`, {
        code: `${newCode}`,
        phonenumber: `+258${phonenumber}`,
      })
      .then((res) => {
        router.push("login/newAccountDetails");
        // toast({
        //   title: "Codigo Enviado",
        //   description: "Consulte o codigo enviado por whatsapp",
        //   status: "success",
        //   duration: 3000,
        //   isClosable: false,
        // });

        // setTimeout(() => {
        //   setGeneratedCode(0);
        // }, 90000);
      })
      .catch((err) => {
        // toast({
        //   title: "Erro ao connectar ao whatsapp",
        //   description: "Tente novamente, mais tarde",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: false,
        // });
        console.info(err.message, err.response.data);
        setErrorRes(err.response.data.message);
      })
      .finally(() => setIsLoadingOTP(false));
  };

  const ConfirmOtpModal = () => {
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
        <AntDesign name="checkcircle" size={hp("10%")} color={colors.sucess} />
        <View style={{ alignItems: "center", marginTop: hp("5%") }}>
          <CustomText
            color={colors.text_dark}
            font={FONTS.Bold}
            fontSize={22}
            txt={"Confirme o numero"}
          />
          <CustomText
            color={colors.text}
            fontSize={16}
            styles={{ textAlign: "center" }}
            txt={`Pretende receber o codigo OTP  ${
              selectedOption.value === "SMS" ? "por SMS" : "pelo Whatsapp"
            } no numero ${phonenumber}?`}
          />
          <TouchableOpacity
            onPress={handleWhatsappCode}
            disabled={isLoadingOTP}
            style={{
              borderRadius: 10,
              backgroundColor: isLoading ? colors.line : colors.sucess,
              padding: 10,
              width: wp("30%"),
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("5%"),
            }}
          >
            <CustomText
              txt={"Confirmar"}
              font={AVAILABLE_FONTS.Medium}
              fontSize={14}
              color={isLoadingOTP ? colors.text_dark : colors.white}
            />
            {isLoadingOTP && (
              <ActivityIndicator size={"small"} color={"white"} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
              value={phonenumber}
              onChangeText={setPhonenumber}
              dataDetectorTypes={"phoneNumber"}
              keyboardType="phone-pad"
              maxLength={9}
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
        {errorField && <ErrorMessage txt={errorField} />}

        <TouchableOpacity
          onPress={handlePhoneValidation}
          disabled={isLoading}
          style={{
            borderRadius: 10,
            backgroundColor: isLoading ? colors.line : colors.main_sec,
            padding: 10,
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CustomText
            txt="Avançar"
            font={AVAILABLE_FONTS.SemiBold}
            fontSize={14}
            color={colors.white}
          />
          {isLoading && (
            <ActivityIndicator size={"small"} color={colors.text} />
          )}
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
          onPress={() => router.push("login/loginAccount")}
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
      <Modalize
        disableScrollIfPossible
        handlePosition="inside"
        modalHeight={hp("50%")}
        ref={modalizeRef}
      >
        <ErrorModal txt={errorRes} />
      </Modalize>
      <Modalize
        disableScrollIfPossible
        handlePosition="inside"
        modalHeight={hp("50%")}
        ref={confirmRef}
      >
        <ConfirmOtpModal />
      </Modalize>
    </MainContainer>
  );
}

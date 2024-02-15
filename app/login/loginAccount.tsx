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
import { useSession } from "../../context/auth";
import { loginSchema } from "../../utils/schemas";
import { Modalize } from "react-native-modalize";
import { AntDesign } from "@expo/vector-icons";
import ErrorModal from "../../components/ErrorModal";
import ErrorMessage from "../../components/ErrorMessage";

export default function LoginAccount() {
  const { colors } = theme;
  const router = useRouter();
  const { signIn, session, processing } = useSession();

  const options = [
    { id: 0, key: "sms", value: "SMS" },
    { id: 1, key: "whatsapp", value: "Whatsapp" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorFields, setErrorFields] = useState(["", ""]);
  const [isPassVisible, setIssPassVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // const validateFIelds = () => {
  //   const result = loginSchema.validate({ phonenumber, password });

  //   console.log(result);
  // };

  const handleLogin = async () => {
    let phoneVal = Boolean(
      phonenumber.length < 9 ||
        Number(phonenumber) < 820000000 ||
        Number(phonenumber) > 879999999
    );
    const passVal = Boolean(password.length < 5);
    const DEFAUL_ERROR_MESSAGE = {
      phonenumber: "Numero invalido",
      password: "Senha invalida. Min 6 caracteres",
    };
    if (phoneVal || passVal) {
      let tmp = [];
      if (phoneVal) {
        tmp.push(DEFAUL_ERROR_MESSAGE.phonenumber);
        // setErrorFields(tmp);
        console.warn("phone", errorFields);
      }

      if (passVal) {
        tmp.push(DEFAUL_ERROR_MESSAGE.password);
        // setErrorFields(tmp);
        console.warn("pass", errorFields);
      }
      setErrorFields(tmp);
      return;
    }

    setErrorFields([]);
    // signIn({ phonenumber: "863312292", password: "123456" });
    const result = await signIn({ phonenumber, password });
    if (!result) {
      Keyboard.dismiss();
      onOpen();
      return;
    }
    router.replace("(app)/home");
  };

  return (
    <MainContainer>
      <View style={{ width: "100%", marginTop: 20 }}>
        <CustomText
          txt="Iniciar Sessão"
          font={AVAILABLE_FONTS.Bold}
          fontSize={32}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {options.map((item, i) => (
            <TouchableOpacity
              key={item.value}
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
              focusable={!processing}
              style={{
                padding: 10,
                fontSize: 14,
                fontFamily: AVAILABLE_FONTS.Bold,
                alignSelf: "center",
                height: "100%",
                width: "100%",
                color: processing ? colors.text_detail : colors.text_dark,
              }}
            />
          </View>
          {errorFields[0] && <ErrorMessage txt={errorFields[0]} />}
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
            <TextInput
              placeholder="palavra passe"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={colors.text_detail}
              secureTextEntry={isPassVisible}
              focusable={!processing}
              style={{
                padding: 10,
                fontSize: 14,
                fontFamily: AVAILABLE_FONTS.Bold,
                alignSelf: "center",
                height: "100%",
                width: "90%",
                color: processing ? colors.text_detail : colors.text_dark,
              }}
            />
            <TouchableOpacity onPress={() => setIssPassVisible(!isPassVisible)}>
              <Octicons name="eye" size={14} />
            </TouchableOpacity>
          </View>
        </View>
        {errorFields[1] && <ErrorMessage txt={errorFields[1]} />}

        <TouchableOpacity
          // onPress={() => router.push("login/home")}
          onPress={() => handleLogin()}
          style={{
            borderRadius: 10,
            backgroundColor: processing ? colors.text_detail : colors.main_sec,
            padding: 10,
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
          disabled={processing}
        >
          <CustomText
            txt="Entrar"
            font={AVAILABLE_FONTS.Regular}
            fontSize={14}
            color={processing ? colors.text : colors.white}
          />
          {processing && (
            <View style={{ marginLeft: 10 }}>
              <ActivityIndicator color={colors.text} size={"small"} />
            </View>
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
          disabled={processing}
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
          disabled={processing}
          onPress={() => router.push("login/newAccountPhone")}
          style={{
            borderRadius: 10,
            backgroundColor: colors.text_dark,
            padding: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <CustomText
            txt="Criar conta"
            font={AVAILABLE_FONTS.Regular}
            fontSize={14}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <Modalize
        // modalStyle={{
        //   height: hp("20%"),
        //   width: wp("40%"),
        //   alignSelf: "center",
        // }}
        disableScrollIfPossible
        handlePosition="inside"
        modalHeight={hp("50%")}
        ref={modalizeRef}
      >
        <ErrorModal />
      </Modalize>
    </MainContainer>
  );
}

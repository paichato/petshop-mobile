import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../../styles/theme";
import { AntDesign, Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Stack, useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import FONTS, { AVAILABLE_FONTS } from "../../constants/FONTS";
import MainContainer from "../../components/MainContainer";
import api from "../../services/api";
import ErrorMessage from "../../components/ErrorMessage";
import { LOCATIONS } from "../../utils/mocks";
import { Modalize } from "react-native-modalize";
import { useNew } from "../../context/newAccountContext";
import ErrorModal from "../../components/ErrorModal";

export default function NewAccountDetails() {
  const { colors } = theme;
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [visiblePass, setVisiblePass] = useState(false);
  const [otp, setOTP] = useState("");
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(95);
  // const [generatedCode, setGeneratedCode] = useState<any>(0);
  const [timer, setTimer] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [thisRes, setThisRes] = useState<Boolean>(false);
  const { userData, generatedCode, generateOtpCode, updateUserData } = useNew();

  const modalizeRef = useRef<Modalize>(null);
  const otpModalizeRef = useRef<Modalize>(null);
  const otpValidationModalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onOpenOtp = () => {
    otpModalizeRef.current?.open();
  };
  const onCloseOtp = () => {
    otpModalizeRef.current?.close();
  };
  const onOpenOtpValidation = () => {
    otpValidationModalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const options = [
    { id: 0, key: "sms", value: "SMS" },
    { id: 1, key: "whatsapp", value: "Whatsapp" },
  ];

  const ERROR_MESSAGES = {
    OTP: { message: "otp invalido. Codigo deve ter 6 digitos." },
    password: { message: "senha inavlida. Min 6 caracteres" },
    confirmPassword: { message: "senha invalida ou nao e' igual" },
    location: { message: "selecione pelo meno uma localidade" },
    username: {
      message: "Deve conter pelo menos 3 caracteres",
    },
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleVisiblePas = () => {
    setVisiblePass(!visiblePass);
  };

  const handleWhatsappCode = async () => {
    let newCode = generateOtpCode();

    await api
      .post(`/sendcode`, {
        code: `${newCode}`,
        phonenumber: `+258${userData.phonenumber}`,
      })
      .then((res) => {
        router.push("login/newAccountDetails");
        setCount(90);
      })
      .catch((err) => {
        console.info(err.message, err.response.data);
        // setErrorRes(err.response.data.message);
      })
      .finally(() => {});
  };

  useEffect(() => {
    setTimeout(() => {
      generateOtpCode();
    }, 90000);
  }, []);

  useEffect(() => {
    if (count > 0) {
      var counterTimer = setTimeout(() => {
        if (count > 0) setCount(count - 1);
      }, 1000);
    }
    if (count === 0) clearTimeout(counterTimer);
  }, [count]);

  const handleAccountCreation = async () => {
    // () => router.push("login/newAccountSteps")
    let tmp = [];
    if (otp.length !== 6 || !Number(otp)) {
      tmp.push("OTP");
    }

    if (username.length < 3 || typeof username == "number") {
      tmp.push("username");
    }

    if (password.length < 6) {
      tmp.push("password");
    }
    if (confirmPassword.length < 6 || confirmPassword !== password) {
      tmp.push("confirmPassword");
    }

    if (!LOCATIONS.some((i) => i.value === location)) {
      tmp.push("location");
    }
    console.log(tmp);
    setErrorFields(tmp);

    if (tmp.length > 0) {
      return setErrorFields(tmp);
    }

    if (String(generatedCode) !== otp) {
      return onOpenOtpValidation();
      // return onOpenOtpValidation();
    }
    setIsLoading(true);
    onOpenOtp();

    await api
      .post(`/create`, {
        name: username,
        password,
        type: "Regular",
        location: "Maputo",
        phonenumber: `+258${userData.phonenumber}`,
      })
      .then((res) => {
        updateUserData({
          phonenumber: userData.phonenumber,
          name: username,
          location,
        });
        setThisRes(true);
        console.log(res);
      })
      .catch((err) => {
        console.info(err.message, JSON.stringify(err.response.data));
        setThisRes(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const SelectLocationModal = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 20,
        }}
      >
        {LOCATIONS.map((i) => (
          <TouchableOpacity
            onPress={() => {
              setLocation(i.value);
              onClose();
            }}
            style={[
              {
                padding: 10,
              },
              i.value === location && {
                borderColor: colors.main_sec,
                backgroundColor: colors.main_sec,
                borderRadius: 10,
                // borderColor: colors.,
                borderWidth: 2,
              },
            ]}
          >
            <CustomText
              txt={i.value}
              font={AVAILABLE_FONTS.SemiBold}
              fontSize={18}
              color={location === i.value ? colors.white : colors.text_detail}
              styles={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const OTPModal = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          // flexDirection: "row",
          // flexWrap: "wrap",
          padding: 20,
        }}
      >
        {isLoading && (
          <>
            <LottieView
              autoPlay
              loop={true}
              style={{
                //   width: 60,
                height: hp(30),
              }}
              source={require("../../assets/lotties/122299-dog-pet-.json")}
            />
            <View style={{ alignItems: "center", marginTop: hp("5%") }}>
              <CustomText
                color={colors.text_dark}
                font={FONTS.Bold}
                fontSize={22}
                txt={"Processando..."}
              />
              <CustomText
                color={colors.text}
                fontSize={16}
                txt={"Os seus dados estao sendo processados"}
              />
            </View>
          </>
        )}

        {!isLoading && (
          <>
            {thisRes && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  marginTop: 40,
                }}
              >
                <AntDesign
                  name="checkcircle"
                  size={hp("10%")}
                  color={colors.sucess}
                />
                <View style={{ alignItems: "center", marginTop: hp("5%") }}>
                  <CustomText
                    color={colors.text_dark}
                    font={FONTS.Bold}
                    fontSize={22}
                    txt={"Conta criada!"}
                  />
                  <CustomText
                    color={colors.text}
                    fontSize={16}
                    txt={"So mais uns passos antes de iniciar"}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => router.replace("login/newAccountSteps")}
                  style={{
                    borderRadius: 10,
                    backgroundColor: colors.sucess,
                    padding: 10,
                    width: wp("30%"),
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: hp("5%"),
                  }}
                >
                  <CustomText
                    txt={"Avançar"}
                    font={AVAILABLE_FONTS.Medium}
                    fontSize={14}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
            {!thisRes && (
              <ErrorModal
                btn
                action={onCloseOtp}
                title="Ocorreu algum erro ao criar conta."
              />
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen />
      <MainContainer scroll>
        <View style={{ width: "100%", marginTop: 20 }}>
          <CustomText
            txt="Criar conta"
            font={AVAILABLE_FONTS.Bold}
            fontSize={32}
          />

          <View style={{ marginTop: 20 }}>
            <CustomText
              txt="Preencha os campos"
              font={AVAILABLE_FONTS.SemiBold}
              fontSize={18}
              color={colors.text_detail}
            />
            <View
              style={{
                padding: 20,
                backgroundColor: colors.line,
                width: "100%",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CustomText
                txt="Codigo enviado para"
                font={AVAILABLE_FONTS.Medium}
                fontSize={14}
                color={colors.main_sec}
              />
              <CustomText
                txt={`+258 ${userData?.phonenumber}`}
                font={AVAILABLE_FONTS.Bold}
                fontSize={14}
                color={colors.text_dark}
              />
              {/* <TouchableOpacity>
      <Octicons username='pencil' size={20} />
    </TouchableOpacity> */}
            </View>

            <View style={{ marginTop: 20 }}>
              <CustomText
                txt="OTP"
                font={AVAILABLE_FONTS.Medium}
                fontSize={14}
                color={colors.text_detail}
              />

              <View
                style={{
                  backgroundColor: colors.line,
                  width: "50%",
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 10,
                  marginTop: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <TextInput
                  secureTextEntry={visiblePass}
                  placeholder="palavra passe"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOTP}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    fontFamily: AVAILABLE_FONTS.Medium,
                    alignSelf: "center",
                    height: "100%",
                    width: "50%",
                    color: colors.text_dark,
                    backgroundColor: colors.line,
                  }}
                />
                <TouchableOpacity
                  onPress={handleWhatsappCode}
                  disabled={count !== 0}
                >
                  <CustomText
                    styles={{
                      borderRadius: 5,
                      backgroundColor: colors.white,
                      padding: 5,
                      overflow: "hidden",
                    }}
                    color={count === 0 ? colors.text : colors.title}
                    txt={count === 0 ? "Reenviar" : `Reenviar(${count})`}
                  />
                </TouchableOpacity>
              </View>
              {errorFields.includes("OTP") && (
                <ErrorMessage txt={ERROR_MESSAGES["OTP"].message} />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText
                txt="Nome de usuario"
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
                <TextInput
                  placeholder="k9 do Sergi"
                  value={username}
                  onChangeText={setUsername}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    fontFamily: AVAILABLE_FONTS.Medium,
                    alignSelf: "center",
                    height: "100%",
                    width: "90%",
                    color: colors.text_dark,
                  }}
                />
              </View>
              {errorFields.includes("username") && (
                <ErrorMessage txt={ERROR_MESSAGES["username"].message} />
              )}
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomText
                txt="Palavra-passe"
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
                <TextInput
                  secureTextEntry={visiblePass}
                  placeholder="palavra passe"
                  value={password}
                  onChangeText={setPassword}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    fontFamily: AVAILABLE_FONTS.Medium,
                    alignSelf: "center",
                    height: "100%",
                    width: "90%",
                    color: colors.text_dark,
                  }}
                />
                <TouchableOpacity onPress={handleVisiblePas}>
                  {visiblePass ? (
                    <Octicons
                      name="eye-closed"
                      size={14}
                      color={colors.text_detail}
                    />
                  ) : (
                    <Octicons name="eye" size={14} color={colors.text_detail} />
                  )}
                </TouchableOpacity>
              </View>
              {errorFields.includes("password") && (
                <ErrorMessage txt={ERROR_MESSAGES["password"].message} />
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <CustomText
                txt="Confirme Palavra-passe"
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
                <TextInput
                  secureTextEntry={visiblePass}
                  placeholder="palavra passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={{
                    padding: 10,
                    fontSize: 14,
                    fontFamily: AVAILABLE_FONTS.Medium,
                    alignSelf: "center",
                    height: "100%",
                    width: "90%",
                    color: colors.text_dark,
                  }}
                />
                <TouchableOpacity onPress={handleVisiblePas}>
                  {visiblePass ? (
                    <Octicons
                      name="eye-closed"
                      size={14}
                      color={colors.text_detail}
                    />
                  ) : (
                    <Octicons name="eye" size={14} color={colors.text_detail} />
                  )}
                </TouchableOpacity>
              </View>
              {errorFields.includes("confirmPassword") && (
                <ErrorMessage txt={ERROR_MESSAGES["confirmPassword"].message} />
              )}
            </View>

            <CustomText
              txt="Localidade"
              font={AVAILABLE_FONTS.Medium}
              fontSize={14}
              color={colors.text_detail}
              styles={{ marginTop: 20 }}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={onOpen}
                style={[
                  {
                    width: "45%",
                    padding: 10,
                    borderRadius: 10,
                    borderColor: colors.line,
                    borderWidth: 2,
                  },
                  !location && { borderColor: colors.main_sec },
                ]}
              >
                <CustomText
                  txt={location ? location : "Selecione localidade"}
                  font={AVAILABLE_FONTS.Medium}
                  fontSize={14}
                  color={colors.text_detail}
                />
              </TouchableOpacity>
            </View>
            {errorFields.includes("location") && (
              <ErrorMessage txt={ERROR_MESSAGES["location"].message} />
            )}
          </View>

          <TouchableOpacity
            onPress={handleAccountCreation}
            style={{
              borderRadius: 10,
              backgroundColor: colors.text_dark,
              padding: 10,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <CustomText
              txt="Avançar"
              font={AVAILABLE_FONTS.Regular}
              fontSize={14}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderRadius: 10,
            backgroundColor: colors.main_sec,
            padding: 20,
            alignItems: "flex-start",
            marginTop: 20,
            borderColor: colors.line,
            borderWidth: 2,
            height: hp(20),
            width: "100%",
          }}
        >
          <CustomText
            txt="Já tem uma conta?"
            font={AVAILABLE_FONTS.SemiBold}
            fontSize={18}
            color={colors.white}
          />
          <CustomText
            txt="Navegue pela maior plataforma canina online de Moçambique"
            font={AVAILABLE_FONTS.Regular}
            fontSize={14}
            color={colors.white}
          />
          <TouchableOpacity
            onPress={() => router.push("login/loginAccount")}
            style={{
              backgroundColor: colors.text_dark,
              padding: 10,
              borderRadius: 10,
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
          handlePosition="outside"
          modalHeight={hp("30%")}
          ref={modalizeRef}
        >
          <SelectLocationModal />
        </Modalize>
        <Modalize
          disableScrollIfPossible
          handlePosition="inside"
          modalHeight={hp("50%")}
          ref={otpModalizeRef}
          closeOnOverlayTap={false}
          onBackButtonPress={() => null}
          withHandle={false}
        >
          <OTPModal />
        </Modalize>
        <Modalize
          disableScrollIfPossible
          handlePosition="inside"
          modalHeight={hp("50%")}
          ref={otpValidationModalizeRef}
        >
          <ErrorModal
            align={true}
            title="Código OTP inválido"
            txt="Tente um código diferente ou clique em reenviar para receber novo código."
          />
        </Modalize>
      </MainContainer>
    </>
  );
}

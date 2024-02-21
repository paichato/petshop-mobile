import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../../styles/theme";
import { AntDesign, Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import FONTS, { AVAILABLE_FONTS } from "../../constants/FONTS";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import MainContainer from "../../components/MainContainer";
import api from "../../services/api";
import { useNew } from "../../context/newAccountContext";
import SucessModal from "../../components/SucessModal";
import { Modalize } from "react-native-modalize";
import ErrorModal from "../../components/ErrorModal";
import { useAuth } from "../../context/auth";

export default function NewAccountSteps() {
  const { colors } = theme;
  const router = useRouter();
  const [isSms, setSms] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const { userData, updateUserData } = useNew();
  const sucessModalizeRef = useRef<Modalize>(null);
  const errorModalizeRef = useRef<Modalize>(null);
  const { signIn, processing: isLoadingLogin } = useAuth();

  const errorOptions = [
    { id: "data", title: "Erro ao actualizar dados", txt: "Tente novamente." },
    {
      id: "login",
      title: "Erro ao Inciar sessão dados",
      txt: "Tente novamente.",
    },
  ];
  const [defaultError, setDefaultError] = useState(errorOptions[0]);

  const steps = [
    {
      header: "Só mais uns passos...",
      description: "Eu como usuário quero",
      options: [
        { id: "Regular", step: "1", value: "Comprar" },
        { id: "Seller", step: "1", value: "Vender" },
      ],
    },
    {
      header: "Vendedor",
      description: "Eu quero",
      options: [
        { id: "Store", step: "2", value: "Promover minha loja" },
        { id: "Individual", step: "2", value: "Vender Cães" },
        { id: "Vet", step: "2", value: "Promover Serviços de Vet" },
        {
          id: "Trainer",
          step: "2",
          value: "Promover outros servicos serviços",
        },
      ],
    },
    {
      header: "O que pretendes",
      description: "Eu como cliente quero",
      options: [
        { id: 8, step: "3", value: "Comprar cães" },
        { id: 9, step: "3", value: "Vender Cães" },
        { id: 10, step: "3", value: "Vender produtos" },
        { id: 11, step: "3", value: "Vender Serviços" },
      ],
    },
  ];

  const [code, setCode] = useState("");

  const updateUserProfile = async () => {
    if (selected[0].id === "Regular") {
      updateUserData({ ...userData, type: "Regular" });
      //signin
      handleLogin();

      return;
    }

    setIsLoadingUpdate(true);

    await api
      .post(`/update-user`, {
        type: "Seller",
        phonenumber: `+258${userData.phonenumber}`,
      })
      .then((res) => {
        updateUserData({ ...userData, type: "Seller" });
        //signin
        // handleLogin();

        sucessModalizeRef.current?.open();
        console.log(res.data);
      })
      .catch((err) => {
        console.info(err.message, JSON.stringify(err.response.data));
        //show error modal
        setDefaultError(errorOptions[0]);
        errorModalizeRef.current?.open();
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });
  };

  const handleLogin = async () => {
    const isUserValid = await signIn({
      phonenumber: userData.phonenumber,
      password: userData.password,
    });

    if (!isUserValid) {
      //showErrorModal
      setDefaultError(errorOptions[1]);
      errorModalizeRef.current?.open();
    }

    router.replace("/");
  };

  const handleSelection = (item) => {
    const tmp = [...selected];
    console.log(selected);

    // console.log(selected.includes(item));
    // if (selected.some(i=> i.id==item.id)) {
    //   // console.log("SELECTED:", JSON.stringify(selected));

    //   const newSelected = tmp.filter((i) => i.id !== item.id);
    //   console.log('NEW SELECTED:',newSelected);

    //    setSelected(newSelected);
    //    return
    // }

    if (selected.some((i) => i.step == item.step)) {
      const newSelected = tmp.filter((i) => i.step !== item.step);
      newSelected.push(item);
      console.log("NEW SELECTED:", newSelected);
      setSelected(newSelected);
      return;
    }

    tmp.push(item);
    setSelected(tmp);
  };

  const handleNext = async () => {
    //if is final step, update userProf
    if (step === 3) {
      await updateUserProfile();
    }
    //user has selected comprar head to final step
    if (step == 1 && selected[0].id === "Regular") {
      setStep(3);
      return;
    }

    if (step < steps.length) {
      return setStep(step + 1);
    }
    // router.push("(app)/home");
    console.log(step);
  };

  const handleBackStep = () => {
    if (step === 3 && selected[0].id === "Regular") {
      setSelected([]);
      return setStep(1);
    }

    if (step > 1) {
      setSelected([]);
      return setStep(step - 1);
    }
  };

  const hasSelected = (() => {
    console.log("has sele:", hasSelected);

    return !selected.some((i) => Number(i.step) == step);
  })();

  const SelectorItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelection(item)}
        style={[
          {
            borderWidth: 1,
            borderColor: colors.ligth_gray,
            padding: 10,
            borderRadius: 5,
            marginTop: 8,
          },
          selected.some((i) => i.id == item.id) && {
            borderColor: colors.main_sec,
            backgroundColor: colors.main_sec_10,
          },
        ]}
      >
        <CustomText txt={item.value} fontSize={14} />
      </TouchableOpacity>
    );
  };

  const BarCounter = () => {
    return (
      <>
        {steps.map((i, index) => (
          <View
            style={[
              {
                height: 4,
                width: wp(10),
                backgroundColor: colors.ligth_gray,
                marginRight: 5,
              },
              index < step && { backgroundColor: colors.main_sec },
            ]}
          ></View>
        ))}
      </>
    );
  };

  return (
    <MainContainer>
      <View
        style={{
          width: "100%",
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {step !== 1 && (
            <TouchableOpacity
              onPress={handleBackStep}
              style={{
                marginRight: 20,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Octicons
                name="chevron-left"
                size={24}
                color={colors.text_dark}
              />
              <CustomText
                styles={{ marginLeft: 10 }}
                txt="Voltar"
                font="Poppins_700Bold"
                fontSize={24}
              />
            </TouchableOpacity>
          )}
        </View>
        <Octicons name="circle" size={20} />
      </View>
      <View style={{ width: "100%", marginTop: 20, flexDirection: "row" }}>
        <BarCounter />
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <CustomText
          txt={"Selecione uma as opções abaixo, para concluir o teu perfil"}
          fontSize={14}
          color={colors.text_detail}
        />
      </View>
      {step < 3 ? (
        <View style={{ width: "100%", marginTop: 20 }}>
          <CustomText
            txt={steps[step - 1].header}
            font={AVAILABLE_FONTS.Bold}
            fontSize={16}
          />
          <View style={{ flexDirection: "row" }}>
            <CustomText
              txt={steps[step - 1].description}
              font={AVAILABLE_FONTS.Medium}
              fontSize={14}
              color={colors.text_detail}
            />
          </View>

          <View style={{ width: "100%", marginTop: 20, height: hp(30) }}>
            {steps[step - 1].options.map((item) => (
              <SelectorItem item={item} key={item.id} />
            ))}
          </View>
        </View>
      ) : (
        <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
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
              txt={"Etapa finalizada"}
            />
            <CustomText
              color={colors.text}
              fontSize={16}
              txt={"Pressione prosseguir para submeter dados"}
            />
          </View>
        </View>
      )}

      <View style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={hasSelected && isLoadingUpdate}
          style={[
            {
              borderRadius: 10,
              backgroundColor: colors.main_sec,
              padding: 20,
              alignItems: "center",
              marginTop: 20,
              borderColor: colors.line,
              borderWidth: 2,
            },
            hasSelected && step !== 3 && { backgroundColor: colors.line },
          ]}
        >
          <CustomText
            txt={step === 3 ? "Prosseguir" : "Próximo"}
            font={AVAILABLE_FONTS.Bold}
            fontSize={14}
            color={colors.white}
            styles={{ textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>
      <Modalize
        disableScrollIfPossible
        handlePosition="outside"
        modalHeight={hp("50%")}
        ref={sucessModalizeRef}
      >
        <SucessModal
          action={handleLogin}
          isDisabled={isLoadingLogin}
          title="Bem vindo!"
          txt="Os seus dados foram actualizados com sucesso"
          btnText="Iniciar sessão >"
          lottie
        />
      </Modalize>

      <Modalize
        disableScrollIfPossible
        handlePosition="inside"
        modalHeight={hp("50%")}
        ref={errorModalizeRef}
      >
        <ErrorModal
          align={true}
          title={defaultError.title}
          txt={defaultError.txt}
        />
      </Modalize>
    </MainContainer>
  );
}

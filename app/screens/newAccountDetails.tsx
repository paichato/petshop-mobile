import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
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

export default function NewAccountDetails() {
  const { colors } = theme;
  const router = useRouter();
  const [location, setLocation]=useState(false);
  const [visiblePass,setVisiblePass]=useState(false);

  const options = [
    { id: 0, key: "sms", value: "SMS" },
    { id: 1, key: "whatsapp", value: "Whatsapp" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleVisiblePas=()=>{
    setVisiblePass(!visiblePass);
  }
  const handleLocation=(value:boolean)=>{
    setLocation(value);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 20,
      }}
    >
      
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
              txt="Número de celular"
              font={AVAILABLE_FONTS.Medium}
              fontSize={14}
              color={colors.text_detail}
            />
            <CustomText
              txt="+258 8633 122 92"
              font={AVAILABLE_FONTS.Bold}
              fontSize={14}
              color={colors.text_dark}
            />
            {/* <TouchableOpacity>
      <Octicons name='pencil' size={20} />
    </TouchableOpacity> */}
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
                {visiblePass ? <Octicons name="eye-closed" size={14} color={colors.text_detail} /> :
                <Octicons name="eye" size={14} color={colors.text_detail} />}
              </TouchableOpacity>
            </View>
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
                {visiblePass ? <Octicons name="eye-closed" size={14} color={colors.text_detail} /> :
                <Octicons name="eye" size={14} color={colors.text_detail} />}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
            onPress={()=>handleLocation(false)}
              style={[{
                width: "45%",
                padding: 10,
                borderRadius: 10,
                borderColor: colors.line,
                borderWidth: 2,
              },!location && {borderColor:colors.main_sec}]}
            >
              <CustomText
                txt="Maputo"
                font={AVAILABLE_FONTS.Medium}
                fontSize={14}
                color={colors.text_detail}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>handleLocation(true)}
              style={[{
                width: "45%",
                padding: 10,
                borderRadius: 10,
                borderColor: colors.line,
                borderWidth: 2,
                
              },location && {borderColor:colors.main_sec}]}
            >
              <CustomText
                txt="Matola"
                font={AVAILABLE_FONTS.Medium}
                fontSize={14}
                color={colors.text_detail}
              />
            </TouchableOpacity>
          </View>
        </View>
        

        <TouchableOpacity
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
          style={{
            backgroundColor: colors.text_dark,
            padding: 10,
            borderRadius: 10,
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
      
    </SafeAreaView>
  );
}

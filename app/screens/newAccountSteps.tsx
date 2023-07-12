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
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default function NewAccountSteps() {
  const { colors } = theme;
  const router = useRouter();
  const [isSms, setSms] = useState(true);
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);

  const steps=[
    {
      header:'Só mais uns passos...',
      description:'Eu como usuário quero',
      options:[
       { id: 0, step: "1", value: "Comprar" },
       { id: 1, step: "1", value: "Vender" },
     ]
    },
    {
      header:'Vendedor',
      description:'Eu quero',
      options:[
        { id: 4, step: "2", value: "Promover loja" },
        { id: 5, step: "2", value: "Vender Cães" },
        { id: 6, step: "2", value: "Vender produtos" },
        { id: 7, step: "2", value: "Vender Serviços" },
      ]
    }, 
    {
      header:'O que pretendes',
      description:'Eu como cliente quero',
      options:[
       { id: 8, step: "3", value: "Comprar cães" },
       { id: 9, step: "3", value: "Vender Cães" },
       { id: 10, step: "3", value: "Vender produtos" },
       { id: 11, step: "3", value: "Vender Serviços" },
     ]
    },

  ]

  const [code, setCode] = useState("");

  const handleSelection = (item) => {
    const tmp=[...selected];
    console.log(selected);

    // console.log(selected.includes(item));
    // if (selected.some(i=> i.id==item.id)) {
    //   // console.log("SELECTED:", JSON.stringify(selected));

    //   const newSelected = tmp.filter((i) => i.id !== item.id);
    //   console.log('NEW SELECTED:',newSelected);

    //    setSelected(newSelected);
    //    return
    // }

    if(selected.some(i=>i.step == item.step)){
      const newSelected = tmp.filter((i) => i.step !== item.step);
      newSelected.push(item);
      console.log('NEW SELECTED:',newSelected);
       setSelected(newSelected);
       return
    }

    tmp.push(item);
    setSelected(tmp);
    
  };

  const handleNext=()=>{
    if(step < steps.length){
      return setStep(step+1);
    }
    router.push('screens/home');
    console.log(step);
    
  }

  const handleBackStep=()=>{
    if(step>1){
      return setStep(step-1);
    }
  }

  const hasSelected=(()=>{
    console.log('has sele:',hasSelected);
    
   return !selected.some(i=>Number(i.step) == step)
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

  const BarCounter=()=>{
    return <>
    {steps.map((i,index)=>
      <View
      style={[{
        height: 4,
        width: wp(10),
        backgroundColor: colors.ligth_gray,
        marginRight: 5,
      }, index < step && {backgroundColor:colors.main_sec} ]}
    ></View>
      )}
    
    </>
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 20,
      }}
    >
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
          <TouchableOpacity onPress={handleBackStep} style={{ marginRight: 20 }}>
            <Octicons
              name="chevron-left"
              size={24}
              color={colors.text_dark}
            />
          </TouchableOpacity>
          <CustomText txt="Voltar" font="Poppins_700Bold" fontSize={24} />
        </View>
        <Octicons name="circle" size={20} />
      </View>
      <View style={{ width: "100%", marginTop: 20, flexDirection: "row" }}>
      <BarCounter/>
      </View>
      <View style={{alignSelf:'flex-start'}}>

      <CustomText txt={'Selecione uma as opções abaixo, para concluir o teu perfil'} fontSize={14} color={colors.text_detail} />
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <CustomText
          txt={steps[step-1].header}
          font={AVAILABLE_FONTS.Bold}
          fontSize={16}
        />
        <View style={{ flexDirection: "row" }}>
          <CustomText
            txt={steps[step-1].description}
            font={AVAILABLE_FONTS.Medium}
            fontSize={14}
            color={colors.text_detail}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20, height:hp(30) }}>
          { steps[step-1].options.map((item) => (
            <SelectorItem item={item} key={item.id} />
          ))
          }
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <TouchableOpacity
        onPress={handleNext}
        disabled={hasSelected}
          style={[{
            borderRadius: 10,
            backgroundColor: colors.main_sec,
            padding: 20,
            alignItems: "center",
            marginTop: 20,
            borderColor: colors.line,
            borderWidth: 2,
          }, hasSelected && {backgroundColor:colors.line}]}
        >
          <CustomText
            txt="Próximo"
            font={AVAILABLE_FONTS.Bold}
            fontSize={14}
            color={colors.white}
            styles={{ textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

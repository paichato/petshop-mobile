import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import theme from '../../styles/theme';
import { Octicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import CustomText from '../../components/CustomText';
import FONTS, { AVAILABLE_FONTS } from '../../constants/FONTS';
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

export default function NewAccountVerification() {

    const {colors}=theme;
    const router = useRouter();


const options=[{id:0, key:'sms', value:'SMS'}, {id:1, key:'whatsapp', value:'Whatsapp'}];

    const [code,setCode]=useState('');

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", backgroundColor:colors.bg_primary, padding:20 }}>
    
    <View style={{width:'100%', marginTop:20}}>

    <CustomText txt='Código de Verificação' font={AVAILABLE_FONTS.Bold} fontSize={32}  />
    <View style={{flexDirection:'row'}}>

   
      <CustomText txt='Introduz os 6 dígitos enviados ao teu número de celular por sms ' font={AVAILABLE_FONTS.Medium} fontSize={14} color={colors.text_detail} />


    </View>

    <View style={{marginTop:20}}>
      <View style={{backgroundColor:colors.line, padding:20}}>
        
    <CustomText txt='Código de verificação enviado para' font={AVAILABLE_FONTS.Medium} fontSize={14} color={colors
    .text_detail}  /> 

    <View style={{backgroundColor:colors.line, width:'100%', borderRadius:10, flexDirection:'row', alignItems:'center',justifyContent:'space-between', marginTop:10}}>
    <CustomText txt='+258 8633 122 92' font={AVAILABLE_FONTS.Bold} fontSize={14} color={colors.text_dark} />
    <TouchableOpacity>
      <Octicons name='pencil' size={20} />
    </TouchableOpacity>

    {/* <TextInput placeholder='821010100' style={{padding:10, fontSize:14, fontFamily:AVAILABLE_FONTS.Bold, alignSelf:'center',  height:'100%', width:'100%', color:colors.text_dark}} />  */}
    </View>
      </View>
    </View>


    <View style={{marginTop:20}}>
    <SmoothPinCodeInput
          restrictToNumbers
          codeLength={6}
          cellStyle={{
            borderBottomWidth: 2,
            // borderWidth: 2,
            // borderRadius:10,
            borderColor: colors.ligth_gray,
            
          }}
          cellStyleFocused={{
            borderColor: colors.main_sec,
            
          }}
          
          textStyleFocused={{ fontFamily:AVAILABLE_FONTS.Bold, color:colors.text_dark}}
          // textColor={{ color: "#FC5185" }}
          
          value={code}
          onTextChange={(code: String) => setCode(code)}
          />

          </View>
    </View>



    <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:1}}>
      <View style={{width:'40%', height:2, backgroundColor:colors.line}}></View>
      <CustomText txt='SMS' color={colors.text_detail} font={AVAILABLE_FONTS.SemiBold} />
      <View style={{width:'40%', height:2, backgroundColor:colors.line}}></View>
    </View>

    <View style={{width:'20%',}}>
    <TouchableOpacity style={{borderRadius:20, backgroundColor:colors.bg_primary, padding:10, alignItems:'center', marginTop:20, borderColor:colors.line, borderWidth:2}}>

<CustomText txt='90 sec' font={AVAILABLE_FONTS.Regular} fontSize={14} color={colors.text_detail} styles={{textAlign:'center'}}  />
</TouchableOpacity>
    </View>
  
  </SafeAreaView>
  )
}
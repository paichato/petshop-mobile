import { View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react'
import theme from '../../styles/theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import CustomText from '../../components/CustomText';
import FONTS, { AVAILABLE_FONTS } from '../../constants/FONTS';
import ErrorMessage from '../../components/ErrorMessage';

export default function NewPub() {

    const {colors, fonts}=theme;

    const CustomInputField=({label="Nome de usuario",placeholder="k9 do Sergi", value, setValue})=>{
        return <View style={{ marginTop: 20 }}>
        <CustomText
          txt={label}
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
            placeholder={placeholder}
            value={value}
          //   onChangeText={""}
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
        <ErrorMessage txt={"haha"} />
        </View>
    }

  return (
    <ScrollView
    contentContainerStyle={{
      // flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.bg_primary,
    //   padding: 20,
      paddingTop:hp(5),
        paddingBottom: 100,
    }}
    style={{
      flex: 1,
      backgroundColor: colors.bg_primary,
    //   paddingTop:100
    }}
    >

<CustomText styles={{marginLeft:10}} txt={"Criar publicacao"} fontSize={20} font={FONTS.Bold} color={colors.text_dark}/>
<CustomInputField/>
<CustomInputField/>
<CustomInputField/>
<CustomInputField/>
    </ScrollView>
  )
}
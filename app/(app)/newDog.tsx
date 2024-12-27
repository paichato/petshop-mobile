import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Octicons } from '@expo/vector-icons';
import CustomText from '../../components/CustomText';
import theme from '../../styles/theme';
import FONTS from '../../constants/FONTS';
import { useRouter } from 'expo-router';

export default function NewDog() {
    const {colors, fonts}=theme;
    const router = useRouter();

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

<View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Octicons name='chevron-left' size={24} color={colors.text}/>
            </TouchableOpacity>
            <CustomText txt='Publicar' fontSize={20} font={FONTS.Bold}/>
            <TouchableOpacity>
                <Octicons name='plus' size={24} color={colors.text}/>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}
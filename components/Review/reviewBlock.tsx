import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import TitleHeader from '../TitleHeader'
import ReviewCardItem from './reviewCardItem'
import FONTS from '../../constants/FONTS'
import CustomText from '../CustomText'
import theme from '../../styles/theme'

export default function ReviewBlock() {
    const {colors}=theme;
  return (
    <View style={{marginTop:20, height:hp(35)}}>
              

    <TitleHeader letfTitle={'Aval dos usuários(7799)'} rightTitle="⭐4.8 >" />
    

    <ScrollView horizontal   contentContainerStyle={{}}>
      <ReviewCardItem />
      <ReviewCardItem />
      <TouchableOpacity style={{padding:20, alignItems:'center', marginTop:30}}>
<CustomText font={FONTS.Bold} txt="Ver todas >" />
      </TouchableOpacity>
    </ScrollView>
    <TouchableOpacity style={{backgroundColor:colors.white, width:'90%', height:40, marginTop:10, borderRadius:5, paddingLeft:20, alignItems:'flex-start', justifyContent:'center'}} >
      <Text>Avaliar</Text>
    </TouchableOpacity>
  </View>
  )
}
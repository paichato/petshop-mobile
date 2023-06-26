import { View, Text } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons'
import CustomText from '../CustomText'
import FONTS from '../../constants/FONTS'
import theme from '../../styles/theme'

export default function ReviewCardItem() {
    const {colors}=theme;
  return (
 <View style={{backgroundColor:colors.white, width:wp(65), maxHeight:200 ,padding:10, borderRadius:10, marginRight:10}}>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10, width:'25%'}}>

<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star" size={14} color={colors.main_sec} />
</View>
<CustomText color={colors.text} font={FONTS.Regular} txt="userxla_  23 Jun 2023"  />
<CustomText  font={FONTS.Regular} txt="Texto bem grande para exemplificar o a descricao do vereruabai
      deisbdasbsda. Texto bem grande para exemplificar o a descricao
      do vereruabai deisbdasbsda"  />
</View>
  )
}
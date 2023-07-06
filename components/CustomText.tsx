import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import theme from '../styles/theme'
import FONTS, { AVAILABLE_FONTS, FontOptions } from '../constants/FONTS';


interface CustomTextProps{
    color:string;
    font:FontOptions ;
    txt:string;
    fontSize:number;
    styles:StyleProp<TextStyle>

};


export default function CustomText({color=theme.colors.text_dark,font=AVAILABLE_FONTS.Regular, txt, fontSize=12, styles}:CustomTextProps) {
  return (
    
      <Text style={[{color, fontFamily:font, fontSize}, styles]} >{txt}</Text>
    
  )
}
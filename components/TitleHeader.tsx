import { View, Text } from 'react-native'
import React from 'react'
import theme from '../styles/theme'
import FONTS from '../constants/FONTS'

export default function TitleHeader({ letfTitle, rightTitle = "" }) {

    const {colors}=theme;
  return (
    <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ color: colors.text_dark, fontSize: 18, fontFamily:FONTS.Bold }}
        >
          {letfTitle}
        </Text>
        <Text
          style={{ color: colors.text_dark, fontSize: 18,  fontFamily:FONTS.Bold }}
        >
          {rightTitle}
        </Text>
      </View>
  )
}
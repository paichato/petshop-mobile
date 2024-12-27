import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import theme from '../styles/theme';
  const { colors } = theme;

export default function SearchVerticalItem({
    img = require("../assets/images/pet-belt.png"),
    type = "product",
    desc="Colar",
    price="14K"
  }) {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: wp(42),
          marginTop: 20,
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 10,
        }}
      >
        
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            width: "60%",
          }}
        >
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star-fill" size={14} color={colors.main_sec} />
          <Octicons name="star" size={14} color={colors.main_sec} />
        </View> */}
        <Image
          source={img}
          style={{
            width: "100%",
            height: 150,
            backgroundColor: colors.bg_primary,
            borderRadius: 10,
          }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 14, fontWeight: "800", marginTop:10 }}>Happy Colar</Text>
        <Text style={{ color: colors.text }}>
          {desc}
        </Text>
        {/* <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{ borderRadius: 5, color: colors.text, fontWeight: "300" }}
          >
            Marca:
          </Text>
          <Text
            style={{
              borderRadius: 5,
              color: colors.main_sec,
              fontWeight: "300",
            }}
          >
            Kuluka
          </Text>
        </View> */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop:10 }}>
            <Text
              style={{
                color: colors.main_sec,
                fontSize: 14,
                fontWeight: "900",
              }}
            >
              {price}
            </Text>
            {/* <Text
              style={{ color: colors.text, fontSize: 14, fontWeight: "300" }}
            >
              .00MZN
             
            </Text> */}
          </View>

          <View></View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

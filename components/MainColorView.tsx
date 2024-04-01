import { View, Text } from 'react-native'
import React from 'react'
import theme from '../styles/theme';

export default function MainColorView({item}) {

    const {colors}=theme;

  return (
  
          <View
            style={{
              flexDirection: "row",
              width: "25%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {item.color.map((i) => (
              <View
                style={{
                  width: 15,
                  aspectRatio: 1,
                  backgroundColor: colors[`${i}`],
                  borderRadius: 100,
                  borderColor: colors.Black,
                  borderWidth: 1,
                }}
              ></View>
            ))}
            {/* <View
              style={{
                width: 15,
                aspectRatio: 1,
                backgroundColor: colors.main_sec,
                borderRadius: 100,
              }}
            ></View> */}
          </View>
        );
    
}
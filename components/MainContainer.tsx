import { View, Text, SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import theme from "../styles/theme";

const MainContainer = ({ children }) => {
  const { colors } = theme;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 20,
      }}
    >
      {children}
    </View>
  );
};

export default MainContainer;

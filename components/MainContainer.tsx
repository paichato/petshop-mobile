import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { ReactNode } from "react";
import theme from "../styles/theme";

const MainContainer = ({ children, scroll = false }) => {
  const { colors } = theme;

  return scroll ? (
    <ScrollView
      contentContainerStyle={{
        // flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 20,
      }}
      style={{
        flex: 1,
        backgroundColor: colors.bg_primary,
        paddingBottom: 100,
      }}
    >
      {children}
    </ScrollView>
  ) : (
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

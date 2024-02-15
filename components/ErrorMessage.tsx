import { View, Text } from "react-native";
import React from "react";
import theme from "../styles/theme";

export default function ErrorMessage({ txt }) {
  const { colors } = theme;
  return (
    <View style={{ padding: 5, marginTop: 10 }}>
      <Text style={{ color: "red" }}>{txt}</Text>
    </View>
  );
}

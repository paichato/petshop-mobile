import { View, Text, TextInput, StyleProp, ViewStyle, TextStyle } from "react-native";
import theme from "../styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MutableRefObject, RefObject } from "react";

interface SpecialInputProps {
  inputValue: string;
  SetInpuValue: (a: string) => void;
  inputRef: any;
  customPlaceholder?: string;
  isPass?: boolean;
  errorLocal?: string;
  label?: string;
  isLoading?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  customLabelStyle?:StyleProp<TextStyle>;
  customInputStyle?: StyleProp<TextStyle>;
}

export const SpecialInput = ({
  inputValue,
  SetInpuValue,
  inputRef,
  customPlaceholder = "something",
  isPass = false,
  errorLocal,
  label = "Numero",
  isLoading = false,
  customStyles,
  customLabelStyle,
  customInputStyle
}: SpecialInputProps) => {
  const { colors } = theme;

  return (
    <View
      style={[
        {
          width: "80%",
          backgroundColor: colors.main_10,
          padding: 20,
          borderRadius: 5,
        },
        customStyles,
      ]}
    >
      <Text style={[{ color: colors.main_80 },customLabelStyle]}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: colors.main_10,

          // marginTop: 20,

          borderBottomColor: colors.main,
          borderBottomWidth: 2,
        }}
      >
        {!isPass && <Text style={{ flex: 1, color: colors.main }}>+258</Text>}
        {isPass ? (
          <TextInput
            ref={inputRef}
            placeholder="Senha"
            placeholderTextColor={colors.main_30}
            editable={!isLoading}
            value={inputValue}
            onChangeText={(txt) => SetInpuValue(txt)}
            dataDetectorTypes={"none"}
            autoCorrect={false}
            autoFocus={false}
            cursorColor={"white"}
            keyboardType="default"
            style={[{
              // height: hp(5),
              color: colors.title,
              flex: 6,
            }, customInputStyle]}
          />
        ) : (
          <TextInput
            ref={inputRef}
            placeholder="84123456"
            editable={!isLoading}
            value={inputValue}
            onChangeText={(txt) => {
              if (!txt.startsWith("8")) return;
              SetInpuValue(txt);
            }}
            maxLength={9}
            dataDetectorTypes={"phoneNumber"}
            autoCorrect={false}
            autoFocus={false}
            cursorColor={"white"}
            keyboardType="number-pad"
            style={[{
              // height: hp(5),
              color: colors.title,
              flex: 6,
            },customInputStyle]}
          />
        )}
      </View>
      {errorLocal && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <MaterialCommunityIcons
            name="magnify-close"
            size={24}
            color={colors.title_dark}
          />
          <Text style={{ color: colors.title_dark }}>{errorLocal}</Text>
        </View>
      )}
    </View>
  );
};

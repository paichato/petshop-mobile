import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import theme from "../../styles/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface MainFullRoundedButtonProps{
    title: string;
    h?: number;
    w?: number;
    primary?: boolean;
    rounded?: boolean;
    customStyles?:StyleProp<ViewStyle>;
    action?: ()=> void;
    customTextStyle?: StyleProp<TextStyle>;

}

export const MainFullRoundedBUtton = ({ title, h, w, primary=true, customStyles, rounded=true, action, customTextStyle }: MainFullRoundedButtonProps) => {
  const { colors } = theme;

  return (
    <>
      {primary ? (
        <TouchableOpacity
        onPress={action}
          style={[{
            width: w ?? "100%",
            height: h ? hp(h) : hp(8),
            backgroundColor: colors.main_80,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: rounded ? 100 : 8,
            shadowColor: colors.main,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          },customStyles && customStyles ]}
        >
          <Text style={[{ color: colors.white, fontWeight: "800" }, customTextStyle && customTextStyle]}>
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        onPress={action}
          style={[{
            marginTop: 10,
            width: w ?? "100%",
            height: h ? hp(h) : hp(8),
            // backgroundColor: colors.bg_primary,
            borderWidth: 2,
            borderColor: colors.line,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: rounded ? 100 : 8,
          }, customStyles && customStyles]}
        >
          <Text style={[{ color: colors.text_detail }, customTextStyle && customTextStyle]}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

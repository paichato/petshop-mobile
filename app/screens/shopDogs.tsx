import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import theme from "../../styles/theme";
import { Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";

interface IProduct {
  description: string;
  color?: string[];
  type: "product" | "dog" | "service";
  stars: number;
  price: number;
  title: string;
  img: string;
  merchant: string;
}

export default function ShopDogs() {
  const { colors } = theme;
  const router = useRouter();

  const ShopItem = ({
    img = require("../../assets/images/pet-belt.png"),
    type = "product",
  }) => {
    const CardFooter = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              padding: 2,
            }}
          >
            <Text
              style={{
                color: colors.text_detail,
                fontSize: 14,
                fontWeight: "600",
                marginLeft: 5,
              }}
            >
              📍Maputo
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: colors.white,
                fontSize: 12,
                fontWeight: "800",
                backgroundColor: colors.text_dark,
                borderRadius: 5,
                padding: 5,
              }}
            >
              verificado ✨
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: colors.white,
                fontSize: 12,
                fontWeight: "800",
                backgroundColor: colors.sucess,
                borderRadius: 5,
                padding: 5,
              }}
            >
              vacinado
            </Text>
          </TouchableOpacity>
          <Text
            style={{ color: colors.main_sec, fontSize: 18, fontWeight: "900" }}
          >
            6 meses
          </Text>
        </View>
      );
    };

    const ColorView = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            width: "25%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              width: 15,
              aspectRatio: 1,
              backgroundColor: colors.main,
              borderRadius: 100,
            }}
          ></View>
          <View
            style={{
              width: 15,
              aspectRatio: 1,
              backgroundColor: colors.main_sec,
              borderRadius: 100,
            }}
          ></View>
        </View>
      );
    };

    return (
      <TouchableOpacity
      onPress={()=>router.push('screens/listDog')}
        style={{
          width: wp(90),
          marginTop: 40,
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 10,
          flexDirection: "column",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "30%",
              height: 120,
              backgroundColor: colors.bg_primary,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontWeight: "200", fontSize: 10 }}>1/6</Text>
            </View>
            <Image
              source={img}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.bg_primary,
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
          </View>

          <View style={{ width: "65%", marginLeft: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: colors.main_sec,
                }}
              >
                Happy Colar
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: colors.text_detail,
                }}
              >
                ha 5 minutos
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  color: colors.text_dark,
                }}
              >
                Vendedor:
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    color: colors.main,
                  }}
                >
                  {" "}
                  Happy Colar
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: colors.text }}>
              Keep your dog teeth healthy and cleanwith the Nerf dogs...
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontWeight: "800",
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                Maltês{" "}
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontWeight: "800",
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                |
              </Text>
              <ColorView />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: colors.main_sec,
                  fontSize: 22,
                  fontWeight: "900",
                }}
              >
                122
              </Text>
              <Text
                style={{ color: colors.text, fontSize: 22, fontWeight: "300" }}
              >
                .00MZN
              </Text>
            </View>
          </View>
        </View>
        <CardFooter />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        padding: 20,
      }}
    >
      <Text>Shop</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Octicons name="apps" size={24} color={colors.header} />
        <Octicons name="credit-card" size={24} color={colors.header} />
      </View>

      <View>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Cães</Text>
        <Text style={{ fontSize: 22, color: colors.main_sec }}>{`(200)`}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          backgroundColor: colors.main_sec,
          padding: 10,
          borderRadius: 100,
        }}
      >
        <Octicons name="filter" size={24} color={colors.white} />
      </View>
    </SafeAreaView>
  );
}

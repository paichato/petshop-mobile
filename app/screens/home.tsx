import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import theme from "../../styles/theme";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SpecialInput } from "../../components/SpecialInput";
import { MainFullRoundedBUtton } from "../../components/Buttons/MainFullRoundedButton";
import CustomText from "../../components/CustomText";
import Carousel from "react-native-snap-carousel";
import FONTS from "../../constants/FONTS";

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

export default function Home() {
  const { colors } = theme;
  const router = useRouter();
  const keyboardRef = useRef();
  const [phonenumber, setPhonumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorLocal, setErrorLocal] = useState("");
  let swipeRef = null;

  const DescItem = ({ name = "ruby", type = "product" }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: 20,
        }}
      >
        <View style={{ width: "25%" }}>
          <Octicons name={name as any} size={28} color={colors.title_dark} />
        </View>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 16,
            color: colors.title_dark,
            width: "75%",
          }}
        >
          Monthly tips on the best diet for your pet
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        paddingTop: 40,
        paddingBottom: 200,
      }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          width: wp(100),
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <CustomText txt="Bem vindo, " fontSize={18} />
          <CustomText
            txt="fulano"
            fontSize={18}
            font={FONTS.Bold}
            color={colors.main_sec}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: wp(20),
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={()=>router.push('screens/search')}>
            <Octicons name="search" size={24} color={colors.text_dark} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Octicons name="heart" size={24} color={colors.text_dark} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: wp(90),
          height: hp("20%"),
          borderRadius: 10,
          alignItems: "flex-start",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: 10,
        }}
      >
        <Carousel
          layout="stack"
          ref={(c) => (swipeRef = c)}
          data={[
            { id: 0, img: require("../../assets/images/kulukapub.jpg") },
            { id: 1, img: require("../../assets/images/kulukapub2.jpg") },
            { id: 2 },
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.main_sec,
                height: hp(20),
                width: wp(90),
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {item.img ? (
                <Image
                  source={item.img}
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors.line,
                    padding: 20,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <CustomText txt="Um texto sobre animais para ver se cabe aqui" />
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.text_dark,
                        width: "60%",
                        height: 40,
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 20,
                      }}
                    >
                      <CustomText txt="Apoiar 🫶🏼" color={colors.white} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Image
                      source={require("../../assets/images/pet-belt.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
              )}

              <CustomText txt={item.id} />
            </View>
          )}
          sliderWidth={wp("90%")}
          itemWidth={300}
          firstItem={1}
          loop
          autoplay
          autoplayDelay={500}
          autoplayInterval={2000}
        />
      </View>

      <View style={{ width: wp(100), padding: 20, marginTop: 20 }}>
        <View style={{ width: "100%" }}>
          <CustomText txt="Serviços" fontSize={22} font={FONTS.Bold} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "47%" }}>
            <TouchableOpacity
            onPress={()=>router.push('screens/shopDogs')}
              style={{
                backgroundColor: colors.main_sec,
                width: "100%",
                height: hp(35),
                borderRadius: 20,
                shadowColor: colors.main_sec,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}
            >
              <Image
                source={require("../../assets/images/Puppy2.png")}
                style={{ height: "100%", width: "100%" }}
              />
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "95%",
                  height: "50%",
                  position: "absolute",
                  bottom: 3,
                  borderRadius: 20,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <CustomText txt="Caẽs" font={FONTS.SemiBold} fontSize={18} />
                <CustomText
                  txt="Procure o teu companheiro com os melhores vendedores"
                  font={FONTS.Regular}
                  color={colors.text}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>router.push('screens/shopServices')}
              style={{
                backgroundColor: colors.main_sec,
                width: "100%",
                height: hp(25),
                borderRadius: 20,
                marginTop: 10,
                shadowColor: colors.main_sec,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}
            >
              <Image
                source={require("../../assets/images/adest.png")}
                style={{ height: "100%", width: "100%" }}
              />
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "95%",
                  height: "50%",
                  position: "absolute",
                  bottom: 3,
                  borderRadius: 20,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <CustomText
                  txt="Diversos"
                  font={FONTS.SemiBold}
                  fontSize={18}
                />
                <CustomText
                  txt="Adestramento, banho, tosa, etc  "
                  font={FONTS.Regular}
                  color={colors.text}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: "47%" }}>
            <TouchableOpacity
            onPress={()=>router.push('screens/shop')}
              style={{
                backgroundColor: colors.main_sec,
                width: "100%",
                height: hp(25),
                borderRadius: 20,
                shadowColor: colors.main_sec,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
              }}
            >
              <Image
                source={require("../../assets/images/pet-belt.png")}
                style={{ height: "60%", width: "100%", resizeMode: "contain" }}
              />
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "95%",
                  height: "50%",
                  position: "absolute",
                  bottom: 3,
                  borderRadius: 20,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <CustomText
                  txt="Produtos"
                  font={FONTS.SemiBold}
                  fontSize={18}
                />
                <CustomText
                  txt="Ração, coleiras, antipulgas, etc "
                  font={FONTS.Regular}
                  color={colors.text}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>router.push('screens/shopVets')}
              style={{
                backgroundColor: colors.main_sec,
                width: "100%",
                height: hp(35),
                borderRadius: 20,
                marginTop: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("../../assets/images/vetnobg.png")}
                style={{ height: "100%", width: "100%" }}
              />
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "95%",
                  height: "50%",
                  position: "absolute",
                  bottom: 3,
                  borderRadius: 20,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <CustomText
                  txt="Veterinários"
                  font={FONTS.SemiBold}
                  fontSize={18}
                />
                <CustomText
                  txt="Os melhores veterinários, para vacinação, desparazitação, consultas,etc "
                  fontSize={12}
                  font={FONTS.Regular}
                  color={colors.text}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>router.push('screens/shopStores')}
          style={{
            width: "100%",
            height: hp(25),
            backgroundColor: colors.main_sec,
            borderRadius: 20,
            marginTop: 10,
          }}
        >
          <Image
            source={require("../../assets/images/building.png")}
            style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          />
          <View
            style={{
              backgroundColor: colors.white,
              width: "95%",
              height: "50%",
              position: "absolute",
              bottom: 3,
              borderRadius: 20,
              alignSelf: "center",
              padding: 10,
            }}
          >
            <CustomText txt="Lojas" font={FONTS.SemiBold} fontSize={18} />
            <CustomText
              txt="Pesquise por lojas físicas "
              fontSize={12}
              font={FONTS.Regular}
              color={colors.text}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

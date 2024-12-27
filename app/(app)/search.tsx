import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import theme from "../../styles/theme";
import { Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import FONTS from "../../constants/FONTS";
import Carousel from "react-native-snap-carousel";
import SearchVerticalItem from "../../components/SearchVerticalItem";

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

export default function Search() {
  const { colors } = theme;
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState({
    id: 0,
    txt: "Recomendado",
  });
  const [pressedFilter, setPressedFilter] = useState(false);
  let swipeRef = null;

  const toggleFilterPress = () => {
    setPressedFilter(!pressedFilter);
  };

  const filters = [
    { id: 0, txt: "Recomendado" },
    { id: 1, txt: "Caẽs" },
    { id: 2, txt: "Produtos" },
    { id: 3, txt: "Veterinários" },
    { id: 4, txt: "Lojas" },
    { id: 5, txt: "Serviços" },
  ];
  const filtersAlt = [
    { id: 0, txt: "Preço" },
    { id: 1, txt: "Raça" },
    { id: 2, txt: "Cor" },
    { id: 3, txt: "Idade" },
    // {id:4,txt:'Lojas'},
    // {id:5,txt:'Serviços'},
  ];

  const ShopItemProduct = ({
    img = require("../../assets/images/pet-belt.png"),
    type = "product",
  }) => {
    return (
      <TouchableOpacity
        style={{
          width: wp(42),
          marginTop: 20,
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "800", marginVertical:10 }}>Happy Colar</Text>
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
        <Text style={{ color: colors.text, marginTop:10 }}>
          Keep your dog teeth Nerf dogs sp...
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
          <View style={{ flexDirection: "row", alignItems: "center", marginTop:20 }}>
            <Text
              style={{
                color: colors.main_sec,
                fontSize: 22,
                fontWeight: "900",
              }}
            >
              14.000
            </Text>
            <Text
              style={{ color: colors.text, fontSize: 14, fontWeight: "300" }}
            >
              {/* .00MZN */}
              MZN
            </Text>
          </View>

          <View></View>
        </View>
      </TouchableOpacity>
    );
  };

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
              {/* <Text style={{ fontWeight: "200", fontSize: 10 }}>1/6</Text> */}
            </View>
            <Image
              source={img}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.bg_primary,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </View>

          <View style={{ width: "65%", marginLeft: 10, justifyContent:'space-between' }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: colors.main_sec,
                }}
              >
                Happy Colar
              </Text> */}
            
            </View>
            <View style={{ flexDirection: "row" }}>
              {/* <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  color: colors.text_dark,
                }}
              >
                Vendedor:
              </Text> */}
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    color: colors.text_dark,
                  }}
                >
                 
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

            {/* <View style={{ flexDirection: "row" }}>
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
            </View> */}

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
          
        </View>
        
        {/* <CardFooter /> */}
      </TouchableOpacity>
    );
  };

  const FilterItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedFilter(item)}
        style={[
          {
            borderRadius: 10,
            backgroundColor: colors.line,
            padding: 10,
            height: 40,
            marginRight: 10,
          },
          item.id === selectedFilter.id && {
            backgroundColor: colors.main_sec_10,
          },
        ]}
      >
        <CustomText txt={item.txt} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.bg_primary,
        paddingBottom: 200,
        padding: 20,
      }}
    >
      <Text>Search</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Octicons name="chevron-left" size={24} color={colors.header} />
        <View>
          <TextInput
            style={{
              width: wp(80),
              height: 40,
              borderRadius: 10,
              backgroundColor: colors.white,
              paddingLeft: 20,
            }}
            placeholder="labrador"
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              alignSelf: "center",
              top: 10,
            }}
          >
            <Octicons name="search" size={24} color={colors.header} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 60 }}>
        <ScrollView
          style={{ height: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ marginTop: 10, flexDirection: "row" }}
        >
          {filters.map((item) => (
            <FilterItem item={item} />
          ))}
        </ScrollView>
        {/* <ScrollView style={{height:10}} showsHorizontalScrollIndicator={false}  horizontal contentContainerStyle={{ marginTop:10,  flexDirection:'row'}}>
        {pressedFilter && filtersAlt.map((item)=><FilterItem item={item}/>)}
      </ScrollView> */}
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

      <View style={{ marginTop: 20 }}>
        <CustomText
          txt="Publicado recentemente"
          font={FONTS.Bold}
          fontSize={18}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <SearchVerticalItem />
          <SearchVerticalItem desc="Maltes" img={require("../../assets/images/Puppy2.png")} />

          <ShopItem img={require("../../assets/images/vet.jpeg")} />
          <ShopItem img={require("../../assets/images/services.jpg")} />
          <ShopItem img={require("../../assets/images/Puppy2.png")} />
        </View>
        <CustomText
          styles={{ marginTop: 40 }}
          txt="Produtos populares"
          font={FONTS.Bold}
          fontSize={18}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <ShopItemProduct img={require("../../assets/images/Puppy2.png")} />
          <ShopItemProduct img={require("../../assets/images/Puppy2.png")} />
        </View>
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
      </View>

      {/* <TouchableOpacity
      onPress={toggleFilterPress}
        style={{
          position: "absolute",
          // top: 400,
          right: 20,
          backgroundColor: colors.main_sec,
          padding: 10,
          borderRadius: 100,
        }}
      >
        <Octicons name="filter" size={24} color={colors.white} />
      </TouchableOpacity> */}
    </ScrollView>
  );
}

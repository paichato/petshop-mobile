import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import theme from "../../styles/theme";
import { Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";
import MainContainer from "../../components/MainContainer";
import api from "../../services/api";
import DogCard from "../../components/DogCard";

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
  const [dogsData, setDogsData] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    // if(page)
    setRefreshing(true);
    setPage(1);
    getDogs();
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
  }, []);

  useEffect(() => {
    getDogs();
  }, [page]);

  const getDogs = async () => {
    if (page > data.totalPages) {
      return;
    }

    setLoading(true);

    api
      .get(`/dogs/all?page=${page}`)
      .then((res) => {
        if (page > 1 && page <= data.totalPages) {
          setDogsData([...dogsData, ...res.data.result]);
          setData(res.data);
          return;
        }

        setDogsData(res.data.result);
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      })
      .finally(() => {
        setRefreshing(false);
        setLoadMore(false);
        setLoading(false);
      });
  };

  function handleFetchMore(distance) {
    if (distance < 1) {
      return;
    }
    if (data.totalPages == page) {
      return;
    }
    setLoadMore(true);
    setPage((oldValue) => oldValue + 1);
  }

  const ShopItem = ({
    title = "Happy Colar",
    owner = "Happy Colar",
    desc = "Something nice",
    race = "Maltes",
    colors = "",
    price = "12000",
    location = "Maputo",
    age = "12",
    img = require("../../assets/images/pet-belt.png"),
    type = "product",
    vacinated = false,
    totalImgs = 1,
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
              📍{location}
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
          {vacinated && (
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
          )}
          <Text
            style={{ color: colors.main_sec, fontSize: 18, fontWeight: "900" }}
          >
            {age} meses
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
        onPress={() => router.push("(app)/listDog")}
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
              <Text style={{ fontWeight: "200", fontSize: 10 }}>1/{}</Text>
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
    <MainContainer>
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
        <Text
          style={{ fontSize: 22, color: colors.main_sec, textAlign: "center" }}
        >{`(${dogsData.length})`}</Text>
      </View>

      {loading && !dogsData[0] && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <LottieView
            autoPlay
            loop={true}
            style={{
              //   width: 60,
              height: hp(30),
            }}
            source={require("../../assets/lotties/122299-dog-pet-.json")}
          />
        </View>
      )}

      <FlatList
        data={dogsData}
        renderItem={({ item }) => <DogCard item={item} />}
        horizontal={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{}}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => {
          handleFetchMore(distanceFromEnd);
        }}
        ListFooterComponent={
          loadMore ? (
            <ActivityIndicator size="large" color={colors.text_dark} />
          ) : (
            <></>
          )
        }
      />

      {/* <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        refreshControl={
          <RefreshControl
            colors={colors.text_dark}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        
      >
        {dogsData.map((item) => (
          <DogCard item={item} />
        ))} */}
      {/* <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} />
        <ShopItem img={require("../../assets/images/Puppy2.png")} /> */}
      {/* </ScrollView> */}
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
    </MainContainer>
  );
}

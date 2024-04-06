import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import theme from "../styles/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { pt, ptBR } from "date-fns/locale";
import { useAppData } from "../context/AppContext";
import MainColorView from "./MainColorView";

const DogCard = ({ item, user }) => {
  const { colors } = theme;
  const router = useRouter();
  const {handleNewListDog}=useAppData();

  const handleDogSelection=()=>{
    handleNewListDog(item);
    router.push({pathname:`/listDog`, params:{id:item.id}});
  }

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
              //   marginLeft: 5,
            }}
          >
            📍{item?.location}
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
        {item?.vacinated && (
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
          {item?.age} meses
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
  };

  return (
    <TouchableOpacity
      onPress={() => handleDogSelection()}
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
            source={
              item.images[0].url
                ? { uri: item.images[0].url }
                : require("../assets/images/Puppy2.png")
            }
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.bg_primary,
              borderRadius: 10,
            }}
            resizeMode="cover"
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
                width: "70%",
              }}
              numberOfLines={1}
            >
              {item?.title ?? "-"}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: colors.text_detail,
              }}
            >
              {formatDistanceToNow(new Date(item.createdAt), {
                includeSeconds: true,
                addSuffix: true,
                locale: ptBR,
              })}
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
                {item?.owner?.name ?? "Happy Colar"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: colors.text }}>{item?.description ?? "-"}</Text>
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
              {item?.race}
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
            <MainColorView item={item} />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: colors.main_sec,
                fontSize: 22,
                fontWeight: "900",
              }}
            >
              {item?.price}
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

export default DogCard;

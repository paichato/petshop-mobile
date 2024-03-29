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
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Modalize } from "react-native-modalize";
import { AVAILABLE_FONTS } from "../../constants/FONTS";
import CustomText from "../../components/CustomText";
import { LOCATIONS } from "../../utils/mocks";
import { useAppData } from "../../context/AppContext";

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
  const [filterPage, setFilterPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState([]);
  const [loadRaces, setLoadRaces] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);
  const [filterUrl, setFilterUrl] = useState(`/dogs/search?page=${filterPage}`);
  const [races, setRaces] = useState([]);
  const {getDogRaces,appData}=useAppData();

  const DEFAULT_FILTER=[{groupId:"h_date", id:"recent", value:"Mais recente"},{ id: "mid", value: "relevante", groupId:"h_price" },{id:"all_races", value:"Todas", groupId:"h_race"},{id:"all_loc", value:"Todas", groupId:"h_location"}];

  const {dogRaces}=appData.filters;

  const mappedLocations=LOCATIONS
  LOCATIONS.forEach(i=>i.filter=`location=${i.value}`);

  const filterOptions = [
    {
      id: "h_date", header: "Filtrar por",
      options: [
        
        { id: "recent", value: "Mais recente", filter: "order=asc" },
        { id: "old", value: "Antigas", filter: "order=desc" },
      ]
    },
    {
      id: "h_price", header: "Precos",
      options: [
        
        { id: "mid", value: "relevante", filter: "asc" },
        { id: "cheaper", value: "Mais barato", filter: "price=asc" },
        { id: "expensive", value: "Mais caro", filter: "price=desc" },
      ]
    },
    {
      id: "h_race", header: "Raca",
      options: [
        {id:"all_races", value:"Todas"},
        ...dogRaces
        // { id: "unkown", value: "relevante", filter: "asc" },
        // { id: "cheaper", value: "Mais barato", filter: "asc" },
        // { id: "expensive", value: "Mais caro", filter: "asc" },
      ]
    },
    {
      id: "h_location", header: "Localizacao",
      options: [
        {id:"all_loc", value:"Todas"},
        ...mappedLocations
        // { id: "mid", value: "relevante", filter: "asc" },
        // { id: "cheaper", value: "Mais barato", filter: "asc" },
        // { id: "expensive", value: "Mais caro", filter: "asc" },
      ]
    },
  ]

  // const getDogRaces=()=>{
  //   setLoadRaces(true);
  //   //TO-DO add logic to load once and add to context
  //   api
  //     .get(`/dogs/races`)
  //     .then((res) => {
  //       const tmp=Object.keys( res.data);
  //       setRaces(tmp);


  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
        
  //     })
  //     .finally(() => {
  //       setLoadRaces(false);
  //     });
  // }

  const handleUrlParse=(currentPage:number)=>{
    let newUrl=`/dogs/search?page=${currentPage}`;
    const tmp=[];
    selected.forEach((i, index)=>{
      // if(index ===selected.length-1){
      //   return tmp.push(i.filter)
      // }
      // tmp.push(`${i.filter}&`)
      tmp.push(`${i.filter}`);
    });
    
    newUrl=newUrl+'&'+tmp.join('&');
    setFilterUrl(newUrl);
    setHasFilters(true);
    console.log(newUrl);
    
    getFilteredDogs(newUrl);
  }

  const onRefresh = useCallback(() => {
    // if(page)
    setRefreshing(true);
    setPage(1);
    getDogs();
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);
  }, []);

  const onOpenFilter = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {

    if(hasFilters) return

    getDogs();
    getDogRaces();
  }, [page]);

  // useEffect(() => {

   

  //   getFilteredDogs();
  
  // }, [filterPage]);

  const getFilteredDogs = async (url:string) => {
    if (filterPage > data.totalPages) {
      return;
    }

    setLoading(true);
    setDogsData([]);
    api
      .get(url)
      .then((res) => {
        if (filterPage > 1 && filterPage <= data.totalPages) {
          setDogsData(JSON.parse(JSON.stringify([...dogsData, ...res.data.result])));
          // setDogsData([...dogsData, ...res.data.result]);
          setData(res.data);
          return;
        }

        setDogsData(JSON.parse(JSON.stringify(res.data.result)));
        // setDogsData(res.data.result);
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

  const getDogs = async () => {
    if (page > data.totalPages) {
      return;
    }

    setLoading(true);

    api
      .get(`/dogs/all?page=${page}`)
      .then((res) => {
        if (page > 1 && page <= data.totalPages) {
          // setDogsData([...dogsData, ...res.data.result]);
          setDogsData(JSON.parse(JSON.stringify([...dogsData, ...res.data.result])));
          setData(res.data);
          return;
        }

        // setDogsData(res.data.result);
        setDogsData(JSON.parse(JSON.stringify(res.data.result)));
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

    if(hasFilters){
      // let newpage=filterUrl.split('&').find(i=>i.includes('page')).split('=')[1]
      setFilterPage(oldValue=>oldValue+1);
      handleUrlParse(filterPage)
    }

    setLoadMore(true);
    setPage((oldValue) => oldValue + 1);
  }

  const handleSelection = (item, groupId) => {
    if(selected.some((i) => i.id == item.id)){
      return
    }
    const tmp = [...selected];
    console.log(selected);


    if (selected.some((i) => i.groupId == groupId)) {
      const newSelected = tmp.filter((i) => i.groupId !== groupId);
      newSelected.push({...item, groupId:groupId});
      console.log("NEW SELECTED:", newSelected);
      setSelected(newSelected);
      return;
    }

    tmp.push({...item, groupId:groupId});
    setSelected(tmp);
  };

  const handleClear=()=>{
    setHasFilters(false);
    setSelected(DEFAULT_FILTER);
    setPage(1);
    getDogs();
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
              <Text style={{ fontWeight: "200", fontSize: 10 }}>1/{ }</Text>
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

  const SelectorItem = ({ item, groupId }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelection(item, groupId)}
        style={[
          {
            borderWidth: 1,
            borderColor: colors.ligth_gray,
            padding: 10,
            borderRadius: 5,
            marginTop: 8,
            marginRight:8
          },
          selected.some((i) => i.id == item.id) && {
            borderColor: colors.main_sec,
            backgroundColor: colors.main_sec_10,
          },
        ]}
      >
        <CustomText txt={item.value} fontSize={14} color={colors.text} />
      </TouchableOpacity>
    );
  };

  const FilterWrapper=({item})=>{
    return <View style={{marginTop:8, padding:8}}>
      <CustomText fontSize={16} font={AVAILABLE_FONTS.SemiBold} color={colors.main_sec} txt={item.header}/>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"flex-start", flexWrap:"wrap"}}>
          {item.options.map((el)=><SelectorItem groupId={item.id} item={el}/>)}
      </View>
    </View>
  }

  const FilterModal = () => {
    return <View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", padding: 10, borderBottomWidth: 1, borderBottomColor: colors.line, marginTop: 20 }}>
        <TouchableOpacity onPress={handleClear}><CustomText
          txt="Limpar"
          font={AVAILABLE_FONTS.Regular}
          fontSize={16}
          color={colors.text}
        /></TouchableOpacity>
        <CustomText
          txt="Filtros"
          font={AVAILABLE_FONTS.Bold}
          color={colors.main_sec}
          fontSize={16}
        />

        <TouchableOpacity onPress={()=>handleUrlParse(filterPage)}><CustomText
          txt="Aplicar"
          color={colors.text}
          font={AVAILABLE_FONTS.Regular}
          fontSize={16}
        /></TouchableOpacity>
      </View>
      {filterOptions.map((element)=><FilterWrapper item={element}/>)}
    </View>
  }

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
      <TouchableOpacity onPress={onOpenFilter}
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
      </TouchableOpacity>
      <Modalize
        // modalStyle={{
        //   height: hp("20%"),
        //   width: wp("40%"),
        //   alignSelf: "center",
        // }}
        disableScrollIfPossible
        handlePosition="inside"
        modalHeight={hp("50%")}
        ref={modalizeRef}
      >
        <FilterModal />
      </Modalize>
    </MainContainer>
  );
}

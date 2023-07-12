import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import theme from "../../styles/theme";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Link, useRouter } from "expo-router";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { mapStyle } from "../../constants/mapStyle";
import FONTS from "../../constants/FONTS";
import CustomText from "../../components/CustomText";
import ImageView from "react-native-image-viewing"
import { Ionicons } from '@expo/vector-icons';

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

export default function ListDog({ navigation }) {
  const { colors } = theme;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    require("../../assets/images/Puppy2.png")
  );
  const [visibleImage, setIsVisibleImage] = useState(false);

  const handleImageSelection = (img) => {
    setSelectedImage(img);
  };

  const toggleVisibleImage=()=>{
    setIsVisibleImage(!visibleImage)
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  const origin = { latitude: 37.78825, longitude: -122.4324 };

  const destination = { latitude: 37.78825, longitude: -122.4929 };


  const Divider = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: colors.line,
          marginTop: 10,
        }}
      ></View>
    );
  };

  const ReviewCard=()=>{
    return <View style={{backgroundColor:colors.white, width:wp(65), maxHeight:200 ,padding:10, borderRadius:10, marginRight:10}}>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10, width:'25%'}}>

<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star-fill" size={14} color={colors.main_sec} />
<Octicons name="star" size={14} color={colors.main_sec} />
</View>
<CustomText color={colors.text} font={FONTS.Regular} txt="userxla_  23 Jun 2023"  />
<CustomText  font={FONTS.Regular} txt="Texto bem grande para exemplificar o a descricao do vereruabai
      deisbdasbsda. Texto bem grande para exemplificar o a descricao
      do vereruabai deisbdasbsda"  />
</View>
  }

  const TitleHeader = ({ letfTitle, rightTitle = "" }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ color: colors.text_dark, fontSize: 18, fontFamily:FONTS.Bold }}
        >
          {letfTitle}
        </Text>
        <Text
          style={{ color: colors.text_dark, fontSize: 18,  fontFamily:FONTS.Bold }}
        >
          {rightTitle}
        </Text>
      </View>
    );
  };

  const InnerHeader = () => {
    return (
      <>
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: 100,
              padding: 10,
              width: 44,
              height: 44,
              alignItems: "center",
            }}
          >
            <Octicons name="chevron-left" size={24} color={colors.text} />
          </View>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: 100,
              padding: 10,
              width: 44,
              height: 44,
              alignItems: "center",
            }}
          >
            <Octicons name="heart" size={24} color={colors.text} />
          </View>
        </View>
      </>
    );
  };

  const ImageContainer = () => {
    return (
      <>
        <InnerHeader />
        <View
          style={{
            width: "90%",
            height: hp(20),
            backgroundColor:'rgba(255,255,255,0.8)',
            marginBottom: 20,
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            padding: 20,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{width:'70%'}}>
              <View>

              <Text
                style={{
                  color: colors.text_dark,
                  fontSize: 18,
                  fontFamily:FONTS.Bold
                }}
                >
                Swat K9
              </Text>
              <View style={{flexDirection:'row'}}>

              <MaterialIcons name="verified" size={24} color={colors.main} />
              <MaterialIcons name="local-fire-department" size={24} color={colors.main_sec} />
              </View>
                </View>
              <Text style={{ color: colors.text_detail, fontWeight: "600", fontFamily:'SpaceMono' }}>
                Proprietário
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                
                color: colors.main_sec,
                fontFamily:FONTS.Bold
              }}
            >
              150 🧡
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

            }}
          >
            <View>

            <Text style={{width:'100%', color: colors.text, fontWeight: "600",fontSize:12, fontFamily:'SpaceMono' }}>
              Verificada
            </Text>
            
            
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.text_dark,
                padding: 10,
                borderRadius: 10,
                width:'30%'
              }}
            >
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                + seguir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
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

  const PercentItem=({completed=20,title='Agressividade'})=>{
    return <View style={{marginTop:10}}>
    <CustomText txt={title} font={FONTS.SemiBold} />
    <View style={{width:wp(35)}}>

<View style={{width:'100%', backgroundColor:colors.main_sec_10, height:5, borderRadius:10}}></View>
<View style={{width:`${completed}%`, backgroundColor:colors.main_sec, height:5, position:'absolute', borderRadius:10}}>
    </View>

</View>
  </View>
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 200,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.bg_primary,
        }}
        style={{
          flex: 1,

          // padding: 20,
        }}
      >
        <ImageBackground
          source={selectedImage}
          style={{
            width: wp(95),
            height: hp(60),
            borderRadius: 20,
            overflow: "hidden",
            paddingTop: 20,
            justifyContent: "space-between",
            backgroundColor: colors.main_sec,
          }}
        >
          <TouchableOpacity  style={{flex:1, justifyContent: "space-between",}} onPress={toggleVisibleImage}>

          <ImageContainer />
          </TouchableOpacity >
        </ImageBackground>

        <View style={{ paddingTop: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                handleImageSelection(require("../../assets/images/Puppy2.png"))
              }
              style={{
                width: "20%",
                aspectRatio: 1,
                backgroundColor: colors.main_sec,
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Image
                source={require("../../assets/images/Puppy2.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleImageSelection(
                  require("../../assets/images/services.jpg")
                )
              }
              style={{
                width: "20%",
                aspectRatio: 1,
                backgroundColor: colors.main_sec,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("../../assets/images/services.jpg")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>

          <View style={{width:wp(90), flexDirection:'row', marginTop:20, justifyContent:'center', flexWrap:'wrap', flexShrink:2 }}>
<View style={{ width:'30%', marginRight:10, aspectRatio:1, backgroundColor:colors.white, borderRadius:10, alignItems:'center', justifyContent:'center', shadowColor: colors.text_dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9}}>
<CustomText txt="Preço" font={FONTS.SemiBold} color={colors.main_sec} />
<CustomText txt="12.000" font={FONTS.SemiBold} fontSize={20} color={colors.text_detail} />
<CustomText txt="MZN" font={FONTS.SemiBold} color={colors.text_detail} />
</View>
<View style={{ width:'30%',marginRight:10, aspectRatio:1, backgroundColor:colors.white, borderRadius:10, alignItems:'center', justifyContent:'center', shadowColor: colors.text_dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9}}>
<CustomText txt="Idade" font={FONTS.SemiBold} color={colors.main_sec} />
<CustomText txt="6" font={FONTS.SemiBold} fontSize={20} color={colors.text_detail} />
<CustomText txt="Meses" font={FONTS.SemiBold} color={colors.text_detail} />
</View>
<View style={{ width:'30%',marginRight:10, aspectRatio:1, backgroundColor:colors.white, borderRadius:10, alignItems:'center', justifyContent:'space-evenly', shadowColor: colors.text_dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9}}>
<CustomText txt="Cor" font={FONTS.SemiBold} color={colors.main_sec} />
<ColorView />
<CustomText txt=" " font={FONTS.SemiBold} color={colors.text} />
</View>
<View style={{ width:'30%',marginTop:10,marginRight:10, aspectRatio:1, backgroundColor:colors.white, borderRadius:10, alignItems:'center', justifyContent:'center', shadowColor: colors.text_dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9}}>
<CustomText txt="Sexo" font={FONTS.SemiBold} color={colors.main_sec} />
<CustomText txt="♂️" font={FONTS.SemiBold} fontSize={20} color={colors.main_sec} />
<CustomText txt=" " font={FONTS.SemiBold} color={colors.text} />
</View>
<View style={{ width:'30%',marginTop:10, marginRight:10, aspectRatio:1, backgroundColor:colors.white, borderRadius:10, alignItems:'center', justifyContent:'center', shadowColor: colors.text_dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9}}>
<CustomText txt="Vacinado" font={FONTS.SemiBold} color={colors.main_sec} />
<CustomText txt="Sim" font={FONTS.SemiBold} fontSize={20} color={colors.text_detail} />
<CustomText txt="" font={FONTS.SemiBold} color={colors.text} />
</View>
<View style={{ width:'30%',marginTop:10, marginRight:10, aspectRatio:1, backgroundColor:colors.white, borderRadius:10, alignItems:'center', justifyContent:'center', shadowColor: colors.text_dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9}}>
<CustomText txt="Raça" font={FONTS.SemiBold} color={colors.main_sec} />
<CustomText txt="Bull Mastiff" font={FONTS.SemiBold} fontSize={14} color={colors.text_detail} />
<CustomText txt="" font={FONTS.SemiBold} color={colors.text} />
</View>
          </View>

          <View style={{ marginTop: 20, width:'90%' }}>
            <TitleHeader
              letfTitle={"Acerca da Cão"}
              
            />
             <TouchableOpacity style={{width:'30%'}}>
            <CustomText txt="vacinado 💉"  
              styles={{
                color: colors.white,
                fontSize: 12,
                fontWeight: "800",
                backgroundColor: colors.sucess,
                borderRadius: 5,
                padding: 5,
              }}
            />
              
         
          </TouchableOpacity>
         

            <View>

              <Text style={{ color: colors.text, fontFamily:FONTS.Regular }}>
                Texto bem grande para exemplificar o a descricao do vereruabai
                deisbdasbsda. Texto bem grande para exemplificar o a descricao
                do vereruabai deisbdasbsda
              </Text>

              <CustomText txt="Bull Mastiff" fontSize={18} font={FONTS.SemiBold} styles={{marginTop:20}} />
              <Text style={{ color: colors.text, fontFamily:FONTS.Regular }}>
                Texto bem grande para exemplificar o a descricao do vereruabai
                deisbdasbsda. Texto bem grande para exemplificar o a descricao
                do vereruabai deisbdasbsda
              </Text>
<View style={{width:wp(90), flexWrap:'wrap', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

              <PercentItem completed={50} />
              <PercentItem title="Adaptabilidade"  />
              <PercentItem title="Pelos" />
              <PercentItem title="Saúde" />
</View>
            </View>

          

            <View style={{ marginTop: 20 }}>
              <TitleHeader letfTitle={"Mais do tipo(48)"} />
              <TouchableOpacity
              onPress={()=>router.push('screens/listDog')}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
               <Image source={require('../../assets/images/Puppy2.png')} style={{width:'30%', aspectRatio:1, backgroundColor:colors.main_sec, borderRadius:10}} />
               <View style={{width:'65%'}}>
                <CustomText txt="Rottweiler"  />
                <CustomText txt="Rottweiler"  />
                <CustomText fontSize={20} txt="12.000.00MZN"  />
               </View>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
              onPress={()=>router.push('screens/listDog')}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
               <Image source={require('../../assets/images/petshop.jpeg')} style={{width:'30%', aspectRatio:1, backgroundColor:colors.main_sec, borderRadius:10}} />
               <View style={{width:'65%'}}>
                <CustomText txt="Rottweiler"  />
                <CustomText txt="Rottweiler"  />
                <CustomText fontSize={20} txt="12.000.00MZN"  />
               </View>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
              onPress={()=>router.push('screens/listDog')}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
               <Image source={require('../../assets/images/Puppy2.png')} style={{width:'30%', aspectRatio:1, backgroundColor:colors.main_sec, borderRadius:10}} />
               <View style={{width:'65%'}}>
                <CustomText txt="Rottweiler"  />
                <CustomText txt="Rottweiler"  />
                <CustomText fontSize={20} txt="12.000.00MZN"  />
               </View>
              </TouchableOpacity>
              <Divider />
              <View style={{width:'100%', alignItems:'center', justifyContent:'center', marginTop:10}}>
                <TouchableOpacity style={{padding:5, backgroundColor:colors.text_dark, borderRadius:5}}>
                  <CustomText txt="Ver mais +" color={colors.white} />
                </TouchableOpacity>
              </View>
             
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <TitleHeader letfTitle={"Localização"} rightTitle="Maputo" />
          
<CustomText txt="📍 Bairro Central B, Rua Bolsa Nota, n256 "/>
          <MapView
            style={{
              height: hp(30),
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 10,
            }}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={""}
              geodesic
              strokeWidth={10}
              strokeColor={"#C49753"}
            />

            <Marker
              style={{ alignItems: "center", justifyContent: "center" }}
              coordinate={origin}
              title="origin"
            >
              <View
                {...Marker}
                style={{
                  backgroundColor: colors.main_sec,
                  borderWidth: 2,
                  borderColor: "#18172B",
                  borderRadius: 50,
                  width: 10,
                  height: 10,
                  alignSelf: "center",
                }}
              ></View>
            </Marker>
            <Marker
              style={{ alignItems: "center", justifyContent: "center" }}
              coordinate={destination}
              title="destination"
            >
              <View
                {...Marker}
                style={{
                  backgroundColor: colors.text_dark,
                  borderWidth: 2,
                  borderColor: "#18172B",
                  borderRadius: 50,
                  width: 15,
                  height: 15,
                  alignSelf: "center",
                }}
              ></View>
            </Marker>
          </MapView>
          </View>

          {/* <View style={{marginTop:20, height:hp(35), width:'90%'}}>
              

              <TitleHeader letfTitle={'Aval dos usuários(7799)'} rightTitle="⭐4.8 >" />
              

              <ScrollView horizontal   contentContainerStyle={{}}>
                <ReviewCard />
                <ReviewCard />
                <TouchableOpacity style={{padding:20, alignItems:'center', marginTop:30}}>
<CustomText font={FONTS.Bold} txt="Ver todas >" />
                </TouchableOpacity>
              </ScrollView>
              <TouchableOpacity style={{backgroundColor:colors.white, width:'90%', height:40, marginTop:10, borderRadius:5, paddingLeft:20, alignItems:'flex-start', justifyContent:'center'}} >
                <Text>Avaliar</Text>
              </TouchableOpacity>
            </View> */}

          <View style={{marginTop:20}}>
            <TouchableOpacity style={{width:'100%',  padding:20, borderRadius:10, backgroundColor:colors.white, borderColor:colors.text_dark, borderWidth:2}}>
              <CustomText txt="Denunciar" font={FONTS.Bold} color={colors.text_dark} />
            </TouchableOpacity>
          </View>
        </View>

        <ImageView
  images={[selectedImage]}
  imageIndex={0}
  visible={visibleImage}
  onRequestClose={() => setIsVisibleImage(false)}
/>
   
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: colors.main_sec,
          padding: 20,
          borderRadius: 20,
          width: wp(90),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        <View style={{ width: "80%", flexDirection: "row" }}>
         
          <Ionicons name="call-outline" size={24} color={colors.white} />
          <Text
            style={{
              color: colors.white,
              fontFamily:FONTS.SemiBold,
              fontSize: 18,
              marginLeft: 10,
            }}
          >
            Agendar marcação
          </Text>
        </View>
        <Text
          style={{
            width: "5%",
            color: colors.white,
            fontWeight: "200",
            fontSize: 24,
          }}
        >
          |
        </Text>
        <TouchableOpacity style={{ width: "10%" }}>

          <Ionicons name="logo-whatsapp" size={24} color={colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
}

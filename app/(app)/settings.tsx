import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import theme from '../../styles/theme'
import { Octicons } from '@expo/vector-icons';
import CustomText from '../../components/CustomText';
import FONTS from '../../constants/FONTS';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import DogCard from '../../components/DogCard';
import { DOG_LIST } from '../../utils/mocks';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function Settings() {

    const {colors, fonts}=theme;
    const [image, setImage] = useState({uri:'', public_id:''});
    const [visibleImage, setIsVisibleImage] = useState(false);
    const router = useRouter();

    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
        //   setImage(result.assets[0].uri);
          setImage({uri:result.assets[0].uri, public_id:""});
        }
      };

    const SettingButton=({title, rightText='Ver mais'})=>{
        return  <TouchableOpacity  style={{padding:20,marginTop:hp(2), backgroundColor:colors.white, borderRadius:20, paddingTop:20, width:'100%', elevation:7}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

        <CustomText styles={{marginLeft:10}} txt={title} fontSize={20} font={FONTS.Bold} color={colors.text_dark}/>
        <CustomText styles={{marginLeft:10}} txt={rightText} fontSize={15} font={FONTS.Regular} color={colors.text_dark}/>
        </View>
       
    </TouchableOpacity>
    }

  return (
    <ScrollView
    contentContainerStyle={{
      // flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.bg_primary,
    //   padding: 20,
      paddingTop:hp(5),
        paddingBottom: 100,
    }}
    style={{
      flex: 1,
      backgroundColor: colors.bg_primary,
    //   paddingTop:100
    }}
    >
        <View style={{width:'90%',flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Octicons name='chevron-left' size={24} color={colors.text}/>
            </TouchableOpacity>
            <CustomText txt='Perfil' fontSize={20} font={FONTS.Bold}/>
            <TouchableOpacity onPress={()=>router.push('(app)/newDog')}>
                <Octicons name='plus' size={24} color={colors.text}/>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:hp(5)}}>
            <Image source={image ? {uri:image.uri} : require('../../assets/images/store.jpeg')} style={{width:hp(15),zIndex:1, aspectRatio:1, borderRadius:'50%', overflow:"hidden",borderWidth:10, borderColor:colors.main_sec_10}}/>
                <TouchableOpacity onPress={pickImage} style={{position:'absolute', backgroundColor:colors.bg_primary, bottom:0, right:0, borderWidth:5, borderColor:colors.main_sec, borderRadius:'50%', overflow:'hidden', padding:5, zIndex:10}}>
                    <Octicons name='pencil' size={24} color={colors.main_50}/>
                </TouchableOpacity>
        
        </View>
        <View style={{alignItems:'center', marginTop:hp(2)}}>
            <CustomText txt='Kanil da forca' fontSize={20} font={FONTS.Bold}/>
            <CustomText txt='840322304' fontSize={16} font={FONTS.Regular} color={colors.text_detail}/>

        </View>

        <View style={{alignItems:'center', justifyContent:'space-between', flexDirection:'row', width:'90%',marginTop:hp(2)}}>
            <View style={{minWidth:wp(25),borderRadius:10, backgroundColor:colors.bg_primary, padding:hp(1), alignItems:'center'}}>
            <CustomText txt='Publicacoes' fontSize={16} font={FONTS.Regular} color={colors.text_detail}/>
            <CustomText txt='4' fontSize={24} font={FONTS.Bold} color={colors.main_sec}/>

            </View>
            <View style={{minWidth:wp(25),borderRadius:10, backgroundColor:colors.bg_primary, padding:hp(1), alignItems:'center'}}>
            <CustomText txt='Seguindo' fontSize={16} font={FONTS.Regular} color={colors.text_detail}/>
            <CustomText txt='20' fontSize={24} font={FONTS.Bold} color={colors.main_sec}/>

            </View>
            <View style={{minWidth:wp(25),borderRadius:10, backgroundColor:colors.bg_primary, padding:hp(1), alignItems:'center'}}>
            <CustomText txt='Seguidores' fontSize={16} font={FONTS.Regular} color={colors.text_detail}/>
            <CustomText txt='9' fontSize={24} font={FONTS.Bold} color={colors.main_sec}/>

            </View>
        </View>

        <View style={{paddingHorizontal:20,marginTop:hp(5), backgroundColor:colors.white, borderRadius:20, paddingTop:20, width:'100%', elevation:7}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

            <CustomText styles={{marginLeft:10}} txt='Minhas publicacoes' fontSize={20} font={FONTS.Bold} color={colors.text_dark}/>
            <CustomText styles={{marginLeft:10}} txt='Ver mais' fontSize={15} font={FONTS.Regular} color={colors.text_dark}/>
            </View>
            <DogCard item={DOG_LIST[0]}/>
            <DogCard item={DOG_LIST[1]}/>
        </View>
       <SettingButton title='Meus Guardados'/>
       <SettingButton title='Editar Perfil' rightText='>'/>
       <SettingButton title='Terminar sessao' rightText='>'/>
     
    </ScrollView>
  )
}
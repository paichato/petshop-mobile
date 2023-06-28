import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import theme from '../../styles/theme';
import { Octicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import FONTS from '../../constants/FONTS';

interface IProduct{
    description:string;
    color?:string[];
    type:'product' | 'dog' | 'service' ;
    stars:number;
    price:number;
    title:string;
    img: string;
    merchant: string;
}

export default function GoPro() {

    const {colors}=theme;
    const router = useRouter();




    const DescItem =({name='ruby', type='product'})=>{
        return  <View style={{flexDirection:'row', alignItems:'center', width:'100%', marginTop:20}}>
        <View style={{width:'25%'}}>

  <Octicons name={name as any} size={28} color={colors.title_dark} />
        </View>
<Text style={{fontFamily:FONTS.Regular, fontSize:16,color:colors.title_dark, width:'75%'}} >Monthly tips on the best diet for your pet</Text>

      </View>
    }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center", backgroundColor:colors.bg_primary,  }}>
      
        <LinearGradient colors={[colors.main_sec, colors.main_alt]} style={{height:hp(40), width:wp(100), borderRadius:5, padding:20, paddingTop:80, overflow:'hidden',}} >
      

        

      <Text style={{fontSize:24, color:colors.white, fontWeight:'800', width:'70%'}}>Knowing your has never been so easy, only with Petty Pro</Text>
      <Image source={require('../../assets/images/pet-belt.png')} style={{height:300, resizeMode:'contain', overflow:'hidden',  bottom:-100, position:'absolute'}} />
      <TouchableOpacity style={{width:40, height:40, backgroundColor:'rgba(250,250,250,0.3)', borderRadius:50, alignItems:'center', position:'absolute', top:50, right:20}}>
<Text style={{fontFamily:FONTS.Medium, fontSize:24,color:colors.white}} >x</Text>
      </TouchableOpacity>

      </LinearGradient>

      <View style={{height:hp(60), width:'100%', alignItems:'center',}}>
        
        <View style={{width:'100%', paddingHorizontal:40}}>
          <DescItem />
          <DescItem name='file' />
          <DescItem name='apps' />
        </View>

<View style={{width:'100%', paddingHorizontal:40, marginTop:40}}>
  <TouchableOpacity style={{width:'100%', height:hp(10), backgroundColor:'red', alignItems:'center',justifyContent:'center', borderRadius:10,  shadowColor: 'red',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,}}>
    <Text style={{color:colors.white, fontFamily:FONTS.Bold}}>Subscreva por 599.00 MZN / mês</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{marginTop:10,width:'100%', height:hp(10), backgroundColor:colors.bg_primary,borderWidth:2, borderColor:colors.line, alignItems:'center',justifyContent:'center', borderRadius:10}}>
    <Text style={{color:colors.text_detail, fontFamily:FONTS.Bold}}>Go pro for 599.00 MZN / mês</Text>
  </TouchableOpacity>
</View>

      </View>
      


     

    
    </SafeAreaView>
  )
}
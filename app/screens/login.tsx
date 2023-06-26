import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import theme from '../../styles/theme';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SpecialInput } from '../../components/SpecialInput';
import { MainFullRoundedBUtton } from '../../components/Buttons/MainFullRoundedButton';

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

export default function Login() {

    const {colors}=theme;
    const router = useRouter();
    const keyboardRef = useRef();
    const [phonenumber, setPhonumber] = useState("");
    const [password, setPassword] = useState("");
    const [errorLocal, setErrorLocal] = useState("");




    const DescItem =({name='ruby', type='product'})=>{
        return  <View style={{flexDirection:'row', alignItems:'center', width:'100%', marginTop:20}}>
        <View style={{width:'25%'}}>

  <Octicons name={name as any} size={28} color={colors.title_dark} />
        </View>
<Text style={{fontWeight:'400', fontSize:16,color:colors.title_dark, width:'75%'}} >Monthly tips on the best diet for your pet</Text>

      </View>
    }

    

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:colors.white,  }}>
      
      <View style={{height:hp(35), width:'100%', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
      <Image source={require('../../assets/images/Puppy2.png')} style={{height:150, width:150, resizeMode:'contain', backgroundColor:colors.main_30,  borderRadius:10}} />
      <Text style={{fontSize:24, color:colors.main, fontWeight:'800', width:'70%', textAlign:'center'}}>Dapata</Text>
      <Text style={{fontSize:14, color:colors.text, fontWeight:'400', width:'70%',textAlign:'center'}}>Encontre o seu animal</Text>

      </View>
<View style={{width:'100%', alignItems:'center', justifyContent:'center', height:hp(60), backgroundColor:colors.white, borderRadius:10}}>

<SpecialInput label='Numero de celular'  errorLocal={errorLocal} SetInpuValue={setPhonumber} inputRef={keyboardRef} inputValue={phonenumber} />
<View style={{height:20}}></View>
<SpecialInput isPass label='Senha' errorLocal={errorLocal} SetInpuValue={setPassword} inputRef={keyboardRef} inputValue={password} />

<View style={{width:'100%', paddingHorizontal:40, marginTop:40}}>
  <MainFullRoundedBUtton rounded={true} title='Iniciar sessão' customTextStyle={{fontSize:18}}  />
  <MainFullRoundedBUtton rounded={true} title='Criar conta' primary={false} customTextStyle={{fontSize:18, fontWeight:'800', color:colors.main_50}} customStyles={{backgroundColor:colors.white}} />

  <TouchableOpacity style={{marginTop:10,width:'100%',  alignItems:'center',justifyContent:'center'}}>
    <Text style={{color:colors.main_50, fontWeight:'700'}}>Esqueci senha</Text>
  </TouchableOpacity>
</View>
</View>
      

     


      


      


     

    
    </SafeAreaView>
  )
}
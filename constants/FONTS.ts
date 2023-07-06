export type FontOptions = 'Poppins_100Thin' | 'Poppins_300Light' | 'Poppins_400Regular' | 'Poppins_500Medium' | 'Poppins_600SemiBold' | 'Poppins_700Bold' | 'Poppins_900Black';

export enum AVAILABLE_FONTS {
  Thin='Poppins_100Thin',
  Light='Poppins_300Light',
  Regular='Poppins_400Regular',
  Medium='Poppins_500Medium',
  SemiBold='Poppins_600SemiBold',
  Bold='Poppins_700Bold',
  Black='Poppins_900Black',
}

// export const AVAILABLE_FONTS : FontOptionsWithDescriptions{
//   Thin='Poppins_100Thin',
//   Light='Poppins_300Light',
//   Regular='Poppins_400Regular',
//   Medium='Poppins_500Medium',
//   SemiBold='Poppins_600SemiBold',
//   Bold='Poppins_700Bold',
//   Black='Poppins_900Black',
// }

type FontOptionsWithDescriptions = {
  [key in FontOptions]: string;
};



export default{
    Thin:'Poppins_100Thin',
//   'Thin_Italic':'Poppins_100Thin_Italic',
//   'Poppins_200ExtraLight',
//   'Poppins_200ExtraLight_Italic',
  Light:'Poppins_300Light',
//   'Poppins_300Light_Italic',
  Regular:'Poppins_400Regular',
//   'Poppins_400Regular_Italic',
  Medium:'Poppins_500Medium',
//   'Poppins_500Medium_Italic',
  SemiBold:'Poppins_600SemiBold',
//   'Poppins_600SemiBold_Italic',
  Bold:'Poppins_700Bold',
//   'Poppins_700Bold_Italic',
//   'Poppins_800ExtraBold',
//   'Poppins_800ExtraBold_Italic',
  Black:'Poppins_900Black',
//   'Poppins_900Black_Italic'
}; 
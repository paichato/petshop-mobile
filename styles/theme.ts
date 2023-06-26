import { useColorScheme } from "react-native";

const ligth= {
      header: "#1B1B1F",
      header_alt: "#33333",
      header_light: "#1B1G0F",
      bg_white:'#fff',
      bg_primary: "#F4F5F6",
      bg_secondary: "##fefffe",
      text: "#7A7A80",
      text_dark:'#312c45',
        text_detail: "#AEAEB3",
      title: "#47474D",
      title_dark: "#61839E",
      line: "#EBEBF0",
      main: "#3D9CEA",
      main_80: "rgba(61,156,234,0.8)",
      main_50: "rgba(61,156,234,0.5)",
      main_30: "rgba(61,156,234,0.3)",
      main_10: "rgba(61,156,234,0.1)",
      main_alt:'#9d8afb',
      main_sec:'#F2982F',
      main_light: "#ffeef3",
      disabled:'#ffbcd0',
      sucess: "#03B252",
      shape: "#E1E1E8",
      shape_dark: "#29292E",
      shadow: '#d5def5',
      shadow_light: '#f3f6fb"',
      white:'#fff',
      special:'#fff9fb',
      ligth_gray: '#e6e0e0'
  };

  const dark= {
    header: "#1B1B1F",
    header_alt: "#33333",
    header_light: "#1B1G0F",
    bg_white:'#fff',
    bg_primary: "#F4F5F6",
    bg_secondary: "##fefffe",
    text: "#7A7A80",
    text_dark:'#312c45',
      text_detail: "#AEAEB3",
    title: "#47474D",
    title_dark: "#173D5C",
    line: "#EBEBF0",
    main: "#3D9CEA",
    main_80: "rgba(61,156,234,0.8)",
    main_50: "rgba(61,156,234,0.5)",
    main_30: "rgba(61,156,234,0.3)",
    main_10: "rgba(61,156,234,0.1)",
    main_alt:'#9d8afb',
    main_sec:'#F2982F',
    main_light: "#ffeef3",
    disabled:'#ffbcd0',
    sucess: "#03B252",
    shape: "#E1E1E8",
    shape_dark: "#29292E",
    shadow: '#d5def5',
    shadow_light: '#f3f6fb"',
    white:'#fff',
    special:'#fff9fb',
    ligth_gray: '#e6e0e0'
  };
const fonts= {
    primary_400: "Inter_400Regular",
    primary_500: "Inter_500Medium",
    secondary_400: "Archivo_400Regular",
    secondary_500: "Archivo_500Medium",
    secondary_600: "Archivo_600SemiBold",
  }
//   const colorScheme = useColorScheme();
  const colorScheme = 'light';
  
  const colors= colorScheme === 'dark' ? dark : ligth;

  export default {colors, fonts}
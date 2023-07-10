import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { SplashScreen, Stack, Navigator,  } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Onboarding from './screens';
import Shop from './screens/shop';
import GoPro from './screens/GoPro';
import Login from './screens/login';
import ShopDogs from './screens/shopDogs';
import ShopVets from './screens/shopVets';
import ShopStores from './screens/shopStores';
import ShopServices from './screens/shopServices';
import ListVet from './screens/listVet';
import ListSeller from './screens/listSeller';
import ListStore from './screens/listStore';
import ListDog from './screens/listDog';
import Home from './screens/home';
import Search from './screens/search';
import LoginAccount from './screens/loginAccount';
import NewAccountVerification from './screens/newAccountVerification';
import NewAccountSteps from './screens/newAccountSteps';
// import ShopDogs from './screens/shopDogs';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'Onboarding',
// };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();



  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
<NewAccountSteps/>
        {/* <Stack initialRouteName='Onboarding' > */}
          {/* <Stack.Screen name="Onboarding" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        {/* </Stack> */}
      </ThemeProvider>
    </>
  );
}

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
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
} from "@expo-google-fonts/poppins";
import { SplashScreen, Stack, Navigator, Slot } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import Onboarding from ".";
import Shop from "./(app)/shop";
import GoPro from "./(app)/GoPro";
import Login from "./login/oldLogin";
import ShopDogs from "./(app)/shopDogs";
import ShopVets from "./(app)/shopVets";
import ShopStores from "./(app)/shopStores";
import ShopServices from "./(app)/shopServices";
import ListVet from "./(app)/listVet";
import ListSeller from "./(app)/listSeller";
import ListStore from "./(app)/listStore";
import ListDog from "./(app)/listDog";
import Home from "./(app)/home";
import Search from "./(app)/search";
import LoginAccount from "./login/loginAccount";
import NewAccountVerification from "./login/newAccountVerification";
import NewAccountSteps from "./login/newAccountSteps";
import NewAccountPhone from "./login/newAccountPhone";
import NewAccountDetails from "./login/newAccountDetails";
import { AuthProvider } from "../context/auth";
import { NewAccountProvider } from "../context/newAccountContext";
// import ShopDogs from './(app)/shopDogs';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'Onboarding',
// };

export default function Layout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
      {loaded && <LayoutNav />}
    </>
  );
}

function LayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <AuthProvider>
        <NewAccountProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            {/* <LoginAccount/> */}
            {/* <Home/> */}
            <Stack screenOptions={{ headerShown: false }} />
            {/* <Stack.Screen name="/loginAccount" options={{ headerShown: false }}  />
          <Stack.Screen name="/newAccountPhone" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
          </ThemeProvider>
        </NewAccountProvider>
      </AuthProvider>
    </>
  );
}

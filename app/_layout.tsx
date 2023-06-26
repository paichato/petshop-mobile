import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Navigator,  } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Onboarding from './screens';
import Shop from './screens/shop';
import GoPro from './screens/GoPro';
import Login from './screens/login';
import ShopDogs from './screens/shopDogs';
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
<ShopDogs/>
        {/* <Stack initialRouteName='Onboarding' > */}
          {/* <Stack.Screen name="Onboarding" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        {/* </Stack> */}
      </ThemeProvider>
    </>
  );
}

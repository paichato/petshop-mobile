import { Redirect, Stack } from "expo-router";
import { useSession } from "../../context/auth";
import { View, Text } from "react-native";

export default function LoginLayout() {
  const { session, isLoading } = useSession();

  console.warn(session);

  if (session) {
    return <Redirect href="(app)/home" />;
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={{ color: "black" }}>Carregando...</Text>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

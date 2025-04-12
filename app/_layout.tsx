import { Colors } from "@/constant/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.bg }}
        edges={["top"]}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

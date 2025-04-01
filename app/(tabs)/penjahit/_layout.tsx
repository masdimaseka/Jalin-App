import { Colors } from "@/constant/Colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function PenjahitLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../../assets/fonts/SpaceMono-Regular.ttf"),
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
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="[id]"
            options={{ headerTitle: "Detail Penjahit" }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import { Colors } from "@/constant/theme";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function DashboardLayout() {
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
            options={{ headerTitle: "Detail Pekerjaan" }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { Colors } from "@/constant/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.bg }}
          edges={["top"]}
        >
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

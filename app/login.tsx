import GlobalStyles from "@/constant/GlobalStyles";
import { Link } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <ScrollView>
          <View>
            <Text style={GlobalStyles.title}>Log In</Text>
            <Link href="/(tabs)" asChild>
              <Pressable style={GlobalStyles.btnPrimary}>
                <Text style={GlobalStyles.btnPrimaryText}>Masuk</Text>
              </Pressable>
            </Link>
            <Link href="/signup" asChild>
              <Pressable style={GlobalStyles.btnSecondary}>
                <Text style={GlobalStyles.btnSecondaryText}>Daftar</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import GlobalStyles from "@/constant/GlobalStyles";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <ScrollView>
          <View>
            <Link href="/(tabs)" asChild>
              <Pressable style={GlobalStyles.btnPrimary}>
                <Text style={GlobalStyles.btnPrimaryText}>Daftar</Text>
              </Pressable>
            </Link>
            <Link href="/login" asChild>
              <Pressable style={GlobalStyles.btnSecondary}>
                <Text style={GlobalStyles.btnSecondaryText}>Masuk</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

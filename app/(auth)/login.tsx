import GlobalStyles from "@/constant/GlobalStyles";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Login() {
  return (
    <ScrollView style={GlobalStyles.container}>
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
  );
}

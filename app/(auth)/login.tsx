import GlobalStyles from "@/constant/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();
  return (
    <ScrollView style={GlobalStyles.container}>
      <View>
        <Text style={GlobalStyles.title}>Log In</Text>
        <Pressable
          style={GlobalStyles.btnPrimary}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={GlobalStyles.btnPrimaryText}>Masuk</Text>
        </Pressable>
        <Pressable
          style={GlobalStyles.btnSecondary}
          onPress={() => router.push("/signup")}
        >
          <Text style={GlobalStyles.btnSecondaryText}>Daftar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

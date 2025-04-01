import GlobalStyles from "@/constant/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Signup() {
  const router = useRouter();
  return (
    <ScrollView style={GlobalStyles.container}>
      <View>
        <Pressable
          style={GlobalStyles.btnPrimary}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={GlobalStyles.btnPrimaryText}>Daftar</Text>
        </Pressable>
        <Pressable
          style={GlobalStyles.btnSecondary}
          onPress={() => router.push("/login")}
        >
          <Text style={GlobalStyles.btnSecondaryText}>Masuk</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

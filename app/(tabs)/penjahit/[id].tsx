import GlobalStyles from "@/constant/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function DetailPenjahit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <ScrollView>
          <Text>Detail Penjahit - {id}</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

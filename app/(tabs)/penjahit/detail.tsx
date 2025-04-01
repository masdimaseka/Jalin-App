import GlobalStyles from "@/constant/GlobalStyles";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IndexPenjahit() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <ScrollView>
          <Text>Detail Penjahit</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import Header from "@/components/Header";
import GlobalStyles from "@/constant/GlobalStyles";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <ScrollView>
          <Header />
          <Text style={GlobalStyles.title}>Home</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

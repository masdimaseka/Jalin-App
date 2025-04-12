import Header from "@/components/Header";
import GlobalStyles from "@/styles/GlobalStyles";
import { ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <Header />
        <ScrollView>
          <Text style={GlobalStyles.title}>Home</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

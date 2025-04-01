import Header from "@/components/Header";
import GlobalStyles from "@/constant/GlobalStyles";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IndexJahitan() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <ScrollView>
          <View>
            <Header />
            <Text style={GlobalStyles.title}>Temukan Jahitan</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";
import GlobalStyles from "@/styles/GlobalStyles";
import { ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <Header />
        <ScrollView>
          <Text style={GlobalStyles.title}>About</Text>
          <AboutUs />
          <ContactUs />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

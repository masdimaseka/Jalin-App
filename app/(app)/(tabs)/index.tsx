import Header from "@/components/Header";
import { Colors } from "@/constant/theme";
import GlobalStyles from "@/styles/GlobalStyles";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useUserData } from "@/hooks/useUserData";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { userData, loadingUserData } = useUserData();

  if (loadingUserData)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <Header />
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[GlobalStyles.subTitle, { marginBottom: 20 }]}>
            Hi, {userData?.nama}
          </Text>

          <ImageBackground
            source={require("@/assets/images/banner.png")}
            style={{ width: "100%", height: 200, justifyContent: "center" }}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Temukan Penjahit Terbaik</Text>
              <Text style={styles.bannerSubtitle}>
                Bergabung bersama Jalin untuk menemukan penjahit terbaik di
                sekitar Anda.
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.buttonRow}>
            <Pressable style={styles.mainButton}>
              <FontAwesome6
                name="people-group"
                size={40}
                color="white"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.buttonText}>Bergabung Sebagai Penjahit</Text>
            </Pressable>

            <Pressable style={styles.mainButton}>
              <MaterialIcons
                name="explore"
                size={40}
                color="white"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.buttonText}>Eksplorasi Temukan Jahitan</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Kenapa Memilih Jalin</Text>
          <View style={styles.featureContainer}>
            {[
              "Kemudahan dan Efisiensi",
              "Inovasi dan Adaptasi",
              "Meningkatkan Pendapatan",
              "Inklusivitas dan Skalabilitas",
            ].map((title, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureTitle}>{title}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bannerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bannerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerSubtitle: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  buttonRow: {
    marginVertical: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    width: "48%",
    padding: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  featureContainer: {
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

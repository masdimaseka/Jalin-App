import Header from "@/components/Header";
import { colors } from "@/constant/theme";
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
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { useRouter } from "expo-router";

export default function Index() {
  const { userData, loadingUserData } = useUserData();

  const router = useRouter();

  if (loadingUserData)
    return (
      <SafeAreaProvider>
        <SafeAreaView style={containerStyles.container} edges={["top"]}>
          <Header />
          <ActivityIndicator size="large" color={colors.primary} />
        </SafeAreaView>
      </SafeAreaProvider>
    );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={containerStyles.container} edges={["top"]}>
        <Header />
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[textStyles.title2, { marginBottom: 20 }]}>
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

          <View style={styles.menuContainer}>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                userData?.role === "penjahit"
                  ? router.push("/(app)/profile")
                  : router.push("/(app)/register-penjahit");
              }}
            >
              <FontAwesome6
                name="people-group"
                size={40}
                color="white"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.menuBtnText}>Bergabung Sebagai Penjahit</Text>
            </Pressable>

            <Pressable
              style={styles.menuBtn}
              onPress={() => router.push("/(app)/(tabs)/jahitan")}
            >
              <MaterialIcons
                name="explore"
                size={40}
                color="white"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.menuBtnText}>Eksplorasi Temukan Jahitan</Text>
            </Pressable>
          </View>

          <Text style={textStyles.title2}>Kenapa Memilih Jalin</Text>
          <View style={styles.featureContainer}>
            <View style={styles.featureCard}>
              <Image
                source={require(`@/assets/images/illus1.png`)}
                style={{ width: 50, height: 40 }}
              />
              <Text style={styles.featureTitle}>Kemudahan dan Efisiensi</Text>
            </View>
            <View style={styles.featureCard}>
              <Image
                source={require(`@/assets/images/illus2.png`)}
                style={{ width: 50, height: 40 }}
              />
              <Text style={styles.featureTitle}>Inovasi dan Adaptasi</Text>
            </View>
            <View style={styles.featureCard}>
              <Image
                source={require(`@/assets/images/illus3.png`)}
                style={{ width: 50, height: 40 }}
              />
              <Text style={styles.featureTitle}>
                Inklusivitas dan Skalabilitas
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Image
                source={require(`@/assets/images/illus4.png`)}
                style={{ width: 50, height: 40 }}
              />
              <Text style={styles.featureTitle}>Kemudahan dan Efisiensi</Text>
            </View>
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
  menuContainer: {
    marginVertical: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    width: "48%",
    padding: 16,
  },
  menuBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  featureContainer: {
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
});

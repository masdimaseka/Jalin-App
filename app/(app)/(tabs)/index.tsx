import Header from "@/components/Header";
import GlobalStyles from "@/styles/GlobalStyles";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Data fitur
const features = [
  {
    title: "Kemudahan dan Efisiensi",
    description:
      "Tidak perlu repot mencari penjahit secara manual dan Penjahit tidak perlu menghabiskan waktu mencari pelanggan.",
  },
  {
    title: "Inovasi dan Adaptasi",
    description:
      "Potensi kolaborasi dengan pihak ketiga (garmen, toko baju bekas) membuka peluang lebih besar untuk ekspansi bisnis.",
  },
  {
    title: "Meningkatkan Pendapatan Penjahit",
    description:
      "Penjahit memiliki akses ke pasar yang lebih luas daripada hanya pelanggan lokal.",
  },
  {
    title: "Inklusivitas dan Skalabilitas",
    description:
      "Cocok untuk semua orang, dari customer individual hingga pelaku usaha yang membutuhkan jahitan massal.",
  },
];

const reviews = [
  {
    rating: 4,
    review:
      "Bapak ini saat sendang menjahit selalu menggunakan atau dengan gaya unik.",
    name: "Tung tung tung Sahur",
    title: "Penjahit Gaun,Permak Levis",
  },
];

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <Header />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Hero Section */}
          <View style={styles.overlay}>
            <Text style={styles.title}>
              Temukan Penjahit Terbaik atau{"\n"}Tawarkan Jasa Jahit Anda di
              Sini!
            </Text>
            <Text style={styles.subtitle}>
              Butuh jasa jahit? Pilih penjahit terbaik sesuai kebutuhan.{"\n"}
              Seorang penjahit? Dapatkan lebih banyak pelanggan dengan mudah!
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonOutline}>
                <Text style={styles.buttonOutlineText}>Dapatkan Jahitan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFilled}>
                <Text style={styles.buttonFilledText}>Cari Penjahit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Kenapa Memilih Jalin */}
          <Text style={styles.sectionTitle}>
            Kenapa Memilih <Text style={styles.highlight}>Jalin</Text>
          </Text>
          <View style={styles.featureContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureNumber}>{index + 1}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>

          {/* Bergabung Bersama Jalin */}
          <View style={styles.joinSection}>
            <Text style={styles.sectionTitle}>Bergabung Bersama Jalin</Text>
            <Text style={styles.joinDescription}>
              Dengan bergabung di Jalin, Anda dapat menemukan penjahit terbaik
              atau menawarkan jasa jahit dengan lebih mudah dan efisien.
            </Text>

            <View style={styles.joinCard}>
              <Text style={styles.joinTitle}>Bergabung Sebagai Penjahit</Text>
              <Text style={styles.joinText}>
                Dapatkan lebih banyak pelanggan dan kelola pesanan dengan mudah!
                Tampilkan hasil karya Anda dan jadilah bagian dari komunitas
                penjahit profesional
              </Text>
              <TouchableOpacity>
                <Text style={styles.joinButtonText}>
                  Mulai Menjahit Sekarang →
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.joinCard}>
              <Text style={styles.joinTitle}>Bergabung Sebagai Customer</Text>
              <Text style={styles.joinText}>
                Dapatkan lebih banyak pilihan penjahit dengan mudah! Dapatkan
                hasil karya dan jadilah bagian dari komunitas penjahit
                profesional
              </Text>
              <TouchableOpacity>
                <Text style={styles.joinButtonText}>
                  Cari Penjahit Sekarang →
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.reviewSection}>
            <Text style={[styles.sectionTitle, { color: "#fff" }]}>
              Ulasan Mereka
            </Text>
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Text
                      key={i}
                      style={{
                        fontSize: 18,
                        color: i <= review.rating ? "#FFD700" : "#ccc",
                      }}
                    >
                      ★
                    </Text>
                  ))}
                </View>
                <Text style={styles.reviewText}>"{review.review}"</Text>
                <View style={styles.reviewerInfo}>
                  {/* Kosongkan avatar */}
                  <View style={styles.avatarPlaceholder} />
                  <View>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <Text style={styles.reviewerTitle}>{review.title}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#435CCC",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  buttonOutline: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonOutlineText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonFilled: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  buttonFilledText: {
    color: "#4A63E7",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  highlight: {
    color: "#4A63E7",
  },
  featureContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A63E7",
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 13,
    color: "#333",
  },
  joinSection: {
    marginBottom: 40,
  },
  joinDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  joinCard: {
    backgroundColor: "#435CCC",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  joinTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  joinText: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 16,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewSection: {
    backgroundColor: "#435CCC",
    padding: 20,
    borderRadius: 16,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  reviewerName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1C1C1C",
  },
  reviewerTitle: {
    fontSize: 14,
    color: "#555",
  },
});

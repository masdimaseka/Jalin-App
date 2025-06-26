import { colors } from "@/constant/theme";
import cardStyles from "@/styles/CardStyles";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { textStyles } from "@/styles/TextStyles";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Gagal mengambil data user:", error);
        } finally {
          setLoading(false);
        }
      } else {
        router.replace("/(auth)/login");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (err) {
      console.error("Gagal logout:", err);
      alert("Gagal logout");
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={containerStyles.container}>
      <View style={cardStyles.card}>
        <View>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View>
          <Text style={cardStyles.cardTitle}>
            {userData?.nama || "Nama Pengguna"}
          </Text>
          <View style={cardStyles.cardContentContainer}>
            <View style={cardStyles.cardContent}>
              <FontAwesome
                name="phone"
                size={16}
                style={{ color: colors.primary }}
              />
              <Text>{userData?.noTelp || "-"}</Text>
            </View>
            <View style={cardStyles.cardContent}>
              <MaterialIcons
                name="email"
                size={16}
                style={{ color: colors.primary }}
              />
              <Text>{userData?.email || "-"}</Text>
            </View>
            <View style={cardStyles.cardContent}>
              <FontAwesome6
                name="map-location-dot"
                size={16}
                style={{ color: colors.primary }}
              />
              <Text>{userData?.lokasi || "-"}</Text>
            </View>
          </View>
        </View>
      </View>

      <Pressable
        style={[
          buttonStyles.btnPrimary,
          { marginTop: 2, backgroundColor: "red" },
        ]}
        onPress={handleLogout}
      >
        <Text style={buttonStyles.btnPrimaryText}>Log Out</Text>
      </Pressable>

      {userData?.role !== "penjahit" ? (
        <View style={[cardStyles.card2, { marginTop: 20 }]}>
          <Text style={textStyles.subTitle}>Ingin menjadi penjahit?</Text>
          <Pressable
            style={[buttonStyles.btnPrimary]}
            onPress={() => router.push("/(app)/register-penjahit")}
          >
            <Text style={buttonStyles.btnPrimaryText}>Daftar Sekarang</Text>
          </Pressable>
        </View>
      ) : (
        <View style={[cardStyles.card2, { marginTop: 20 }]}>
          <View
            style={{
              paddingBottom: 16,
              marginBottom: 16,
              borderBottomWidth: 1,
              borderColor: "lightgray",
            }}
          >
            <Text style={[cardStyles.cardTitle]}>Informasi Penjahit</Text>
          </View>
          <View>
            <Text style={[textStyles.subTitle, { marginBottom: 8 }]}>
              Deskripsi penjahit
            </Text>
            <Text>{userData?.dataPenjahit?.deskripsi}</Text>
          </View>
          <View>
            <Text style={[textStyles.subTitle, { marginBottom: 8 }]}>
              Rata-rata biaya jasa
            </Text>
            <Text>{userData?.dataPenjahit?.rataRataBiaya}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

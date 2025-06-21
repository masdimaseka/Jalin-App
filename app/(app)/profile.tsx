import { Colors } from "@/constant/theme";
import CardStyles from "@/styles/CardStyles";
import GlobalStyles from "@/styles/GlobalStyles";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

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

  if (loading) {
    return (
      <View style={GlobalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={CardStyles.card}>
        <View>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View>
          <Text style={CardStyles.cardTitle}>
            {userData?.username || "Nama Pengguna"}
          </Text>
          <View style={CardStyles.cardContentContainer}>
            <View style={CardStyles.cardContent}>
              <FontAwesome
                name="phone"
                size={16}
                style={{ color: Colors.primary }}
              />
              <Text>{userData?.noHp || "-"}</Text>
            </View>
            <View style={CardStyles.cardContent}>
              <FontAwesome6
                name="envelope"
                size={12}
                style={{ color: Colors.primary }}
              />
              <Text>{userData?.email || "-"}</Text>
            </View>
          </View>
        </View>
      </View>

      <Pressable
        style={[
          GlobalStyles.btnPrimary,
          { marginTop: 12, backgroundColor: "lightgray" },
        ]}
      >
        <Text style={GlobalStyles.btnPrimaryText}>Edit Profile</Text>
      </Pressable>

      <Pressable
        style={[
          GlobalStyles.btnPrimary,
          { marginTop: 2, backgroundColor: "red" },
        ]}
        onPress={handleLogout}
      >
        <Text style={GlobalStyles.btnPrimaryText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

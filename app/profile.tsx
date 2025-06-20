import { Colors } from "@/constant/Colors";
import CardStyles from "@/styles/CardStyles";
import GlobalStyles from "@/styles/GlobalStyles";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const docRef = doc(FIREBASE_DB, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <View style={CardStyles.card}>
        <View>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{
              width: 80,
              height: 80,
            }}
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
        onPress={() => router.push("/login")}
      >
        <Text style={GlobalStyles.btnPrimaryText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default profile;

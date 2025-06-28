import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { useUserData } from "@/hooks/useUserData";
import { colors } from "@/constant/theme";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { textStyles } from "@/styles/TextStyles";

type DataItemPekerjaan = {
  id: string;
  judul: string;
  deadline: string;
  status: string;
  dataUser: any;
  dataPenjahit: any;
  alamat: string;
  gambar: string;
};

export default function IndexDashboard() {
  const router = useRouter();
  const { userData, loadingUserData } = useUserData();

  if (loadingUserData) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      <Header />

      <Text style={[textStyles.title, { marginBottom: 20 }]}>
        Menu Dashboard
      </Text>

      <View>
        <Pressable
          style={[buttonStyles.menuBtn, { marginBottom: 20, width: "100%" }]}
          onPress={() => {
            router.push("/(app)/(tabs)/dashboard/my-jahitan");
          }}
        >
          <FontAwesome5
            name="tshirt"
            size={32}
            color="white"
            style={{ marginBottom: 10 }}
          />
          <Text style={buttonStyles.menuBtnText}>Daftar Jahitan Saya</Text>
        </Pressable>

        {userData?.role === "penjahit" ? (
          <Pressable
            style={[buttonStyles.menuBtn, { marginBottom: 20, width: "100%" }]}
            onPress={() =>
              router.push("/(app)/(tabs)/dashboard/dashboard-penjahit")
            }
          >
            <Entypo
              name="briefcase"
              size={32}
              color="white"
              style={{ marginBottom: 10 }}
            />
            <Text style={buttonStyles.menuBtnText}>Dashboard Penjahit</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[buttonStyles.menuBtn, { marginBottom: 20, width: "100%" }]}
            onPress={() => router.push("/(app)/register-penjahit")}
          >
            <Entypo
              name="briefcase"
              size={32}
              color="white"
              style={{ marginBottom: 10 }}
            />
            <Text style={buttonStyles.menuBtnText}>Daftar Penjahit</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

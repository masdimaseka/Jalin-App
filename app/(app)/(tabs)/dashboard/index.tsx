import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import CardPekerjaan from "@/components/CardPekerjaan";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { colors } from "@/constant/theme";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";

type DataItemPekerjaan = {
  id: string;
  judul: string;
  deadline: string;
  status: string;
  dataUser: any;
  dataPenjahit: any;
  alamat: string;
};

export default function IndexDashboard() {
  const [show, setShow] = useState<"user" | "penjahit">("user");
  const [data, setData] = useState<DataItemPekerjaan[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { userData, loadingUserData } = useUserData();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "jahitan"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataItemPekerjaan[];

      setData(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredDataAsUser = data.filter(
    (item) => item.dataUser?.uid === userData?.uid
  );

  const filteredDataAsPenjahit = data.filter(
    (item) => item.dataPenjahit?.uid === userData?.uid
  );

  const currentData =
    show === "user" ? filteredDataAsUser : filteredDataAsPenjahit;

  if (loading || loadingUserData) {
    return (
      <View style={containerStyles.container}>
        <Header />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      <Header />

      <View style={buttonStyles.btnTabContainer}>
        <Pressable
          style={[
            buttonStyles.btnTab,
            show === "user"
              ? buttonStyles.btnTabActive
              : buttonStyles.btnTabInactive,
          ]}
          onPress={() => setShow("user")}
        >
          <FontAwesome5
            name="tshirt"
            size={16}
            style={[
              show === "user"
                ? buttonStyles.btnTabIconActive
                : buttonStyles.btnTabIconInactive,
            ]}
          />
          <Text
            style={[
              buttonStyles.btnTabText,
              show === "user"
                ? buttonStyles.btnTabTextActive
                : buttonStyles.btnTabTextInactive,
            ]}
          >
            Jahitan Saya
          </Text>
        </Pressable>

        {userData?.role === "penjahit" && (
          <Pressable
            style={[
              buttonStyles.btnTab,
              show === "penjahit"
                ? buttonStyles.btnTabActive
                : buttonStyles.btnTabInactive,
            ]}
            onPress={() => setShow("penjahit")}
          >
            <Entypo
              name="briefcase"
              size={16}
              style={[
                show === "penjahit"
                  ? buttonStyles.btnTabIconActive
                  : buttonStyles.btnTabIconInactive,
              ]}
            />
            <Text
              style={[
                buttonStyles.btnTabText,
                show === "penjahit"
                  ? buttonStyles.btnTabTextActive
                  : buttonStyles.btnTabTextInactive,
              ]}
            >
              Pekerjaan Saya
            </Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/dashboard/[id]",
                params: { id: item.id },
              })
            }
          >
            <CardPekerjaan
              judul={item.judul}
              deadline={item.deadline}
              dataUser={item.dataUser}
              alamat={item.alamat}
            />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Tidak ada hasil yang ditemukan
          </Text>
        }
      />
    </View>
  );
}

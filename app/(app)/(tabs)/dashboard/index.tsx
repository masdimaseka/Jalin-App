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
import GlobalStyles from "@/styles/GlobalStyles";
import { useRouter } from "expo-router";
import CardPekerjaan from "@/components/CardPekerjaan";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { Colors } from "@/constant/theme";

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
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <View style={GlobalStyles.container}>
      <Header />

      <View style={styles.tabButtonContainer}>
        <Pressable
          style={[
            styles.tabButton,
            show === "user" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setShow("user")}
        >
          <Text
            style={[
              styles.tabButtonText,
              show === "user" ? styles.tabTextActive : styles.tabTextInactive,
            ]}
          >
            Jahitan Saya
          </Text>
        </Pressable>

        {userData?.role === "penjahit" && (
          <Pressable
            style={[
              styles.tabButton,
              show === "penjahit"
                ? styles.tabButtonActive
                : styles.tabButtonInactive,
            ]}
            onPress={() => setShow("penjahit")}
          >
            <Text
              style={[
                styles.tabButtonText,
                show === "penjahit"
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
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

const styles = StyleSheet.create({
  tabButtonContainer: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 8,
  },
  tabButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
  },
  tabButtonInactive: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
  },
  tabButtonText: {
    fontWeight: "bold",
  },
  tabTextActive: {
    color: "white",
  },
  tabTextInactive: {
    color: Colors.primary,
  },
});

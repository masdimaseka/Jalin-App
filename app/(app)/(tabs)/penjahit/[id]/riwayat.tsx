import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useUserData } from "@/hooks/useUserData";
import CardPekerjaan from "@/components/CardPekerjaan";
import { containerStyles } from "@/styles/ContainerStyles";
import { colors } from "@/constant/theme";

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

export default function riwayat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataItemPekerjaan[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  console.log("ID Penjahit:", id);

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

  const filteredDataAsPenjahit = data.filter(
    (item) => item.dataPenjahit?.uid === id
  );

  if (loading) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      <FlatList
        data={filteredDataAsPenjahit}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Pressable>
            <CardPekerjaan
              judul={item.judul}
              deadline={item.deadline}
              dataUser={item.dataUser}
              alamat={item.alamat}
              gambar={item.gambar}
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

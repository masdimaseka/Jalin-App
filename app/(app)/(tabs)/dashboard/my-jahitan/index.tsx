import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "expo-router";
import { colors } from "@/constant/theme";
import { containerStyles } from "@/styles/ContainerStyles";
import CardPekerjaan from "@/components/CardPekerjaan";
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

export default function indexMyJahitan() {
  const [data, setData] = useState<DataItemPekerjaan[]>([]);
  const [loading, setLoading] = useState(true);

  const { userData, loadingUserData } = useUserData();

  const router = useRouter();

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

  if (loading || loadingUserData) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      <Text style={[textStyles.title, { marginBottom: 20 }]}>
        Daftar Jahitan Saya
      </Text>
      <FlatList
        data={filteredDataAsUser}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/dashboard/my-jahitan/[id]",
                params: { id: item.id },
              })
            }
          >
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

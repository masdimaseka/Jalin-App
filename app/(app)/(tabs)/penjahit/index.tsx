import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import CardPenjahit from "@/components/CardPenjahit";
import { containerStyles } from "@/styles/ContainerStyles";
import { colors } from "@/constant/theme";

type DataItemPekerjaan = {
  id: string;
  dataPenjahit: any;
  nama: string;
  role: string;
  alamat: string;
  profileImg: string;
};

export default function IndexPenjahit() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [data, setData] = useState<DataItemPekerjaan[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleSubmitSearch = (query: string) => {
    setSubmittedQuery(query);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataItemPekerjaan[];

      setData(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = data.filter((item) => {
    const query = submittedQuery.toLowerCase();
    const matchNama = item.nama?.toLowerCase().includes(query);

    return item.role === "penjahit" && matchNama;
  });

  if (loading) {
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

      <SearchInput
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmitSearch={handleSubmitSearch}
        placeholder="Cari penjahit..."
        title="Penjahit"
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/penjahit/[id]",
                params: { id: item.id },
              })
            }
          >
            <CardPenjahit
              nama={item.nama}
              alamat={item.alamat}
              profileImg={item.profileImg}
              dataPenjahit={item.dataPenjahit}
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

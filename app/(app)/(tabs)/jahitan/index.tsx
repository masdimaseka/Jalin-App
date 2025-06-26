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
import SearchInput from "@/components/SearchInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CardPekerjaan from "@/components/CardPekerjaan";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { colors } from "@/constant/theme";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";

type DataItemPekerjaan = {
  id: string;
  judul: string;
  deadline: string;
  status: string;
  dataUser: any;
  alamat: string;
};

export default function IndexJahitan() {
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
    const unsubscribe = onSnapshot(collection(db, "jahitan"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataItemPekerjaan[];

      setData(list);
      setLoading(false);
      console.log("Data realtime diperbarui:", list.length);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = data.filter((item) => {
    const query = submittedQuery.toLowerCase();
    const matchJudul = item.judul?.toLowerCase().includes(query);

    return item.status === "pending" && matchJudul;
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
        placeholder="Cari jahitan..."
        title="Jahitan"
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
                pathname: "/(app)/(tabs)/jahitan/[id]",
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

      <Pressable
        style={buttonStyles.btnFloatBR}
        onPress={() => router.push("/(app)/(tabs)/jahitan/create")}
      >
        <MaterialCommunityIcons
          name="briefcase-upload"
          size={24}
          color="white"
        />
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Upload Jahitan
        </Text>
      </Pressable>
    </View>
  );
}

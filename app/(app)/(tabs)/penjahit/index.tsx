import CardPenjahit from "@/components/CardPenjahit";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import GlobalStyles from "@/styles/GlobalStyles";
import { DataItemPenjahit, PENJAHIT_DATA } from "@/data/DataPenjahitDummy";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function IndexPenjahit() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // teks yang sedang diketik
  const [submittedQuery, setSubmittedQuery] = useState(""); // teks hasil submit

  const router = useRouter();

  const handleSubmitSearch = (query: string) => {
    setSubmittedQuery(query); // ini yang dipakai untuk filter
  };

  const filteredData = PENJAHIT_DATA.filter(
    (item) =>
      item.namaPenjahit.toLowerCase().includes(submittedQuery.toLowerCase()) ||
      item.spesialisasiPenjahit.some((spesialisasi) =>
        spesialisasi.toLowerCase().includes(submittedQuery.toLowerCase())
      )
  );

  return (
    <View style={GlobalStyles.container}>
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
        keyExtractor={(item) => item.idPenjahit}
        initialNumToRender={5}
        renderItem={({ item }: { item: DataItemPenjahit }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/penjahit/[id]",
                params: { id: item.idPenjahit },
              })
            }
          >
            <CardPenjahit
              namaPenjahit={item.namaPenjahit}
              lokasiPenjahit={item.lokasiPenjahit}
              ratingPenjahit={item.ratingPenjahit}
              tarifJahit={item.tarifJahit}
              spesialisasiPenjahit={item.spesialisasiPenjahit}
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

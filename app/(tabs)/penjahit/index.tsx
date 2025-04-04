import CardPenjahit from "@/components/CardPenjahit";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import GlobalStyles from "@/constant/GlobalStyles";
import { DataItemPenjahit, PENJAHIT_DATA } from "@/data/DataPenjahitDummy";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function IndexPenjahit() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const filteredData = PENJAHIT_DATA.filter(
    (item) =>
      item.namaPenjahit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spesialisasiPenjahit.some((spesialisasi) =>
        spesialisasi.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <View style={GlobalStyles.container}>
      <Header />

      <View>
        <SearchInput
          openSearchBar={openSearchBar}
          setOpenSearchBar={setOpenSearchBar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }: { item: DataItemPenjahit }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(tabs)/penjahit/[id]",
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
        keyExtractor={(item) => item.idPenjahit}
        initialNumToRender={5}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Tidak ada hasil yang ditemukan
          </Text>
        }
      />
    </View>
  );
}

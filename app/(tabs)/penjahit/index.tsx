import CardPenjahit from "@/components/CardPenjahit";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { PENJAHIT_DATA, DataItem } from "@/constant/DataDummy";
import GlobalStyles from "@/constant/GlobalStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function IndexPenjahit() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const filteredData = PENJAHIT_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
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
        renderItem={({ item }: { item: DataItem }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(tabs)/penjahit/[id]",
                params: { id: item.id },
              })
            }
          >
            <CardPenjahit
              name={item.name}
              location={item.location}
              rating={item.rating}
              paymentRate={item.paymentRate}
              specialties={item.specialties}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
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

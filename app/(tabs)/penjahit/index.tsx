import CardPenjahit from "@/components/CardPenjahit";
import Header from "@/components/Header";
import { PENJAHIT_DATA, DataItem } from "@/constant/DataDummy";
import GlobalStyles from "@/constant/GlobalStyles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

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
        {!openSearchBar ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text style={GlobalStyles.title}>Daftar Penjahit</Text>
            <TouchableOpacity onPress={() => setOpenSearchBar(true)}>
              <FontAwesome name="search" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <TextInput
              style={{
                height: 40,
                flex: 1,
                borderRadius: 8,
                paddingHorizontal: 12,
                backgroundColor: "#fff",
              }}
              placeholder="Cari penjahit atau spesialisasi..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                setOpenSearchBar(false);
                setSearchQuery("");
              }}
            >
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }: { item: DataItem }) => (
          <CardPenjahit
            onPress={() =>
              router.push({
                pathname: "/(tabs)/penjahit/[id]",
                params: { id: item.id },
              })
            }
            name={item.name}
            location={item.location}
            rating={item.rating}
            paymentRate={item.paymentRate}
            specialties={item.specialties}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Tidak ada hasil yang ditemukan
          </Text>
        }
      />
    </View>
  );
}

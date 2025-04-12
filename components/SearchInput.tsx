import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import GlobalStyles from "@/styles/GlobalStyles";

type SearchInputProps = {
  openSearchBar: boolean;
  setOpenSearchBar: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
};

const SearchInput = ({
  openSearchBar,
  setOpenSearchBar,
  searchQuery,
  setSearchQuery,
}: SearchInputProps) => {
  return (
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
  );
};

export default SearchInput;

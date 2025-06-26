import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constant/theme";
import { textStyles } from "@/styles/TextStyles";

type SearchInputProps = {
  openSearchBar: boolean;
  setOpenSearchBar: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSubmitSearch: (query: string) => void;
  placeholder: string;
  title: string;
};

const SearchInput = ({
  openSearchBar,
  setOpenSearchBar,
  searchQuery,
  setSearchQuery,
  onSubmitSearch,
  placeholder,
  title,
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
          <Text style={textStyles.title}>{title}</Text>
          <Pressable onPress={() => setOpenSearchBar(true)}>
            <FontAwesome name="search" size={24} color="gray" />
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
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
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => onSubmitSearch(searchQuery)}
            returnKeyType="search"
            autoFocus
          />
          <Pressable
            onPress={() => onSubmitSearch(searchQuery)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Cari</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpenSearchBar(false);
              setSearchQuery("");
              onSubmitSearch("");
            }}
          >
            <Ionicons name="close" size={24} color="gray" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default SearchInput;

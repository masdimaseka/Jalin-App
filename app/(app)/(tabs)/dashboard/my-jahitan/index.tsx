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
import { buttonStyles } from "@/styles/ButtonStyles";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

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
  const [show, setShow] = useState("list");

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
    (item) => item.dataUser?.uid === userData?.uid && item.status !== "selesai"
  );

  const filteredDataAsUserFinished = data.filter(
    (item) => item.dataUser?.uid === userData?.uid && item.status === "selesai"
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
      <View style={buttonStyles.btnTabContainer}>
        <Pressable
          style={[
            buttonStyles.btnTab,
            show === "list"
              ? buttonStyles.btnTabActive
              : buttonStyles.btnTabInactive,
            {
              marginRight: 8,
            },
          ]}
          onPress={() => setShow("list")}
        >
          <FontAwesome5
            name="tshirt"
            size={16}
            style={[
              show === "list"
                ? buttonStyles.btnTabIconActive
                : buttonStyles.btnTabIconInactive,
            ]}
          />
          <Text
            style={[
              buttonStyles.btnTabText,
              show === "list"
                ? buttonStyles.btnTabTextActive
                : buttonStyles.btnTabTextInactive,
            ]}
          >
            Jahitan Saya
          </Text>
        </Pressable>

        <Pressable
          style={[
            buttonStyles.btnTab,
            show === "selesai"
              ? buttonStyles.btnTabActive
              : buttonStyles.btnTabInactive,
            {
              marginRight: 8,
            },
          ]}
          onPress={() => setShow("selesai")}
        >
          <FontAwesome
            name="check-circle"
            size={16}
            style={[
              show === "selesai"
                ? buttonStyles.btnTabIconActive
                : buttonStyles.btnTabIconInactive,
            ]}
          />
          <Text
            style={[
              buttonStyles.btnTabText,
              show === "selesai"
                ? buttonStyles.btnTabTextActive
                : buttonStyles.btnTabTextInactive,
            ]}
          >
            Jahitan Selesai
          </Text>
        </Pressable>
      </View>

      {show === "list" && (
        <>
          <Text style={[textStyles.title, { marginBottom: 20 }]}>
            Daftar Jahitan Saya
          </Text>
          <FlatList
            data={filteredDataAsUser}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 100,
            }}
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
        </>
      )}

      {show === "selesai" && (
        <>
          <Text style={[textStyles.title, { marginBottom: 20 }]}>
            Daftar Jahitan Saya
          </Text>
          <FlatList
            data={filteredDataAsUserFinished}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 100,
            }}
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
        </>
      )}
    </View>
  );
}

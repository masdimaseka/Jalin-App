import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
  ScrollView,
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
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import cardStyles from "@/styles/CardStyles";

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

export default function indexDashboardPenjahit() {
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

  const filteredDataAsPenjahit = data.filter(
    (item) =>
      item.dataPenjahit?.uid === userData?.uid && item.status !== "selesai"
  );

  const filteredDataAsPenjahitFinished = data.filter(
    (item) =>
      item.dataPenjahit?.uid === userData?.uid && item.status === "selesai"
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
        <ScrollView horizontal>
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
              Pekerjaan Saya
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
              Pekerjaan Selesai
            </Text>
          </Pressable>

          <Pressable
            style={[
              buttonStyles.btnTab,
              show === "profile"
                ? buttonStyles.btnTabActive
                : buttonStyles.btnTabInactive,
            ]}
            onPress={() => setShow("profile")}
          >
            <Entypo
              name="briefcase"
              size={16}
              style={[
                show === "profile"
                  ? buttonStyles.btnTabIconActive
                  : buttonStyles.btnTabIconInactive,
              ]}
            />
            <Text
              style={[
                buttonStyles.btnTabText,
                show === "profile"
                  ? buttonStyles.btnTabTextActive
                  : buttonStyles.btnTabTextInactive,
              ]}
            >
              Profile
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {show === "list" && (
        <>
          <Text style={[textStyles.title, { marginBottom: 20 }]}>
            Daftar Jahitan Saya
          </Text>
          <FlatList
            data={filteredDataAsPenjahit}
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
                    pathname: "/(app)/(tabs)/dashboard/dashboard-penjahit/[id]",
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
                Tidak ada pekerjaan yang sedang berlangsung
              </Text>
            }
          />
        </>
      )}

      {show === "selesai" && (
        <>
          <Text style={[textStyles.title, { marginBottom: 20 }]}>
            Daftar Jahitan Saya yang Selesai
          </Text>
          <FlatList
            data={filteredDataAsPenjahitFinished}
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
                    pathname: "/(app)/(tabs)/dashboard/dashboard-penjahit/[id]",
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
                Tidak ada pekerjaan yang sudah selesai
              </Text>
            }
          />
        </>
      )}

      {show === "profile" && (
        <>
          <Text style={[textStyles.title, { marginBottom: 20 }]}>
            Profile Penjahit Saya
          </Text>

          <View style={[cardStyles.card2]}>
            <View
              style={{
                paddingBottom: 16,
                marginBottom: 16,
                borderBottomWidth: 1,
                borderColor: "lightgray",
              }}
            >
              <Text style={[cardStyles.cardTitle]}>Informasi Penjahit</Text>
            </View>
            <View>
              <Text style={[textStyles.subTitle, { marginBottom: 8 }]}>
                Deskripsi penjahit
              </Text>
              <Text>{userData?.dataPenjahit?.deskripsi}</Text>
            </View>
            <View>
              <Text style={[textStyles.subTitle, { marginBottom: 8 }]}>
                Rata-rata biaya jasa
              </Text>
              <Text>{userData?.dataPenjahit?.rataRataBiaya}</Text>
            </View>
            <View>
              <Text style={[textStyles.subTitle, { marginBottom: 8 }]}>
                Kemampuan
              </Text>
              <Text>{userData?.dataPenjahit?.kemampuan}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

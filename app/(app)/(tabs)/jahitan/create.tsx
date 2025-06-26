import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constant/theme";
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { inputStyles } from "@/styles/InputStyles";
import { textStyles } from "@/styles/TextStyles";

export default function create() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tenggat, setTenggat] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [jam, setJam] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [alamat, setAlamat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userData, loadingUserData } = useUserData();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Izin lokasi ditolak");
        return;
      }

      const lokasiSaatIni = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: lokasiSaatIni.coords.latitude,
        longitude: lokasiSaatIni.coords.longitude,
      });

      if (geo.length > 0) {
        const g = geo[0];
        const alamatLengkap = `${g.street || g.name || ""}, ${
          g.city || g.subregion || ""
        }`;
        setAlamat(alamatLengkap);
      }
    })();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setTenggat(selectedDate.toISOString().split("T")[0]);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setJam(`${hours}:${minutes}`);
    }
  };

  const handleSubmit = async () => {
    if (!judul || !deskripsi || !tenggat || !jam || !alamat) {
      alert("Peringatan: Semua field harus diisi");
      return;
    }

    const deadline = `${tenggat}T${jam}:00`;

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, "jahitan", new Date().getTime().toString()), {
        judul,
        deskripsi,
        deadline,
        alamat,
        status: "pending",
        dataUser: {
          uid: userData?.uid,
          nama: userData?.nama || "",
          email: userData?.email || "",
          noTelp: userData?.noTelp || "",
          lokasi: userData?.lokasi || "",
        },
        dataPenjahit: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("Berhasil mengirim!");
      router.back();
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUserData)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={containerStyles.container}>
      <Text style={[textStyles.subTitle, { marginBottom: 20 }]}>
        Lengkapi form berikut
      </Text>

      <Text style={{ marginBottom: 8 }}>Judul pekerjaan</Text>
      <TextInput
        style={inputStyles.input}
        placeholder="Judul Pekerjaan"
        value={judul}
        onChangeText={setJudul}
      />

      <Text style={{ marginBottom: 8 }}>Deskripsi pekerjaan</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={inputStyles.multilineInput}
        placeholder="Deskripsi Pekerjaan"
        value={deskripsi}
        onChangeText={setDeskripsi}
      />

      <Text style={{ marginBottom: 8 }}>Tenggat Pengerjaan</Text>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={inputStyles.input}
      >
        <Text
          style={{
            color: tenggat ? "#000" : "#aaa",
            fontSize: 16,
            marginTop: 12,
          }}
        >
          {tenggat ? tenggat : "Pilih tanggal"}
        </Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={tenggat ? new Date(tenggat) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <Text style={{ marginBottom: 8 }}>Waktu Pengerjaan</Text>
      <Pressable
        onPress={() => setShowTimePicker(true)}
        style={inputStyles.input}
      >
        <Text
          style={{ color: jam ? "#000" : "#aaa", fontSize: 16, marginTop: 12 }}
        >
          {jam ? jam : "Pilih waktu"}
        </Text>
      </Pressable>
      {showTimePicker && (
        <DateTimePicker
          value={jam ? new Date(`1970-01-01T${jam}:00`) : new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}

      <Text style={{ marginBottom: 8 }}>Alamat pengambilan jahitan</Text>
      <TextInput
        style={inputStyles.input}
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
      />

      <Pressable style={buttonStyles.btnPrimary} onPress={handleSubmit}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={buttonStyles.btnPrimaryText}>Kirim</Text>
        )}
      </Pressable>
    </View>
  );
}

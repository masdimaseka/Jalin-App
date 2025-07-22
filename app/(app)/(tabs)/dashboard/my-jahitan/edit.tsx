import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { uploadImageToCloudinary } from "@/service/cloudinaryService";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { inputStyles } from "@/styles/InputStyles";
import { textStyles } from "@/styles/TextStyles";
import { useGetLocation } from "@/hooks/useGetLocation";
import { usePickImage } from "@/hooks/usePickImage";
import { useGetDateAndTime } from "@/hooks/useGetDateAndTime";

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [oldImage, setOldImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const { alamat, setAlamat } = useGetLocation();
  const { image, pickImage } = usePickImage();
  const { userData, loadingUserData } = useUserData();
  const router = useRouter();

  const {
    date: tenggat,
    time: jam,
    showDatePicker,
    showTimePicker,
    setShowDatePicker,
    setShowTimePicker,
    onDateChange: handleDateChange,
    onTimeChange: handleTimeChange,
    setDate,
    setTime,
  } = useGetDateAndTime();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "jahitan", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setJudul(data.judul);
          setDeskripsi(data.deskripsi);
          setAlamat(data.alamat);
          setOldImage(data.gambar || null);

          const [tanggal, waktu] = data.deadline.split("T");
          setDate(tanggal);
          setTime(waktu.slice(0, 5));
        } else {
          Alert.alert("Error", "Data tidak ditemukan");
          router.back();
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        Alert.alert("Error", "Terjadi kesalahan saat mengambil data");
        router.back();
      } finally {
        setLoadingData(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!judul || !deskripsi || !tenggat || !jam || !alamat) {
      alert("Peringatan: Semua field harus diisi");
      return;
    }

    const deadline = `${tenggat}T${jam}:00`;
    setIsSubmitting(true);

    try {
      let imageUrl = oldImage;

      if (image) {
        imageUrl = await uploadImageToCloudinary(
          image,
          "jahitan",
          `gambar_${new Date().getTime()}`
        );
      }

      await updateDoc(doc(db, "jahitan", id), {
        judul,
        deskripsi,
        deadline,
        alamat,
        gambar: imageUrl || null,
        updatedAt: new Date().toISOString(),
      });

      Alert.alert("Berhasil", "Pekerjaan berhasil diperbarui");
      router.back();
    } catch (error: any) {
      console.error("Error updating post:", error);
      alert("Gagal memperbarui: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUserData || loadingData)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={containerStyles.container}>
      <ScrollView>
        <Text style={[textStyles.subTitle, { marginBottom: 20 }]}>
          Ubah detail pekerjaan
        </Text>

        {(image || oldImage) && (
          <Image
            source={{ uri: image || oldImage! }}
            style={{
              width: "100%",
              height: 200,
              marginVertical: 10,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        )}

        <Text style={{ marginBottom: 8 }}>Unggah gambar</Text>
        <Pressable style={buttonStyles.btnSecondary} onPress={pickImage}>
          <Text style={buttonStyles.btnSecondaryText}>
            {image ? "Ganti Gambar" : "Pilih Gambar"}
          </Text>
        </Pressable>

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

        <Text style={{ marginBottom: 8 }}>Batas Waktu Pengerjaan</Text>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={inputStyles.input}
        >
          <Text
            style={{
              color: jam ? "#000" : "#aaa",
              fontSize: 16,
              marginTop: 12,
            }}
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
            <Text style={buttonStyles.btnPrimaryText}>Simpan Perubahan</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

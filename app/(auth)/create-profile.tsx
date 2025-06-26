import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContext";
import * as Location from "expo-location";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { inputStyles } from "@/styles/InputStyles";
import { buttonStyles } from "@/styles/ButtonStyles";

export default function CreateProfile() {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSignUp = async () => {
    if (!nama || !noTelp || !alamat) {
      alert("Peringatan: Semua field harus diisi termasuk foto");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user?.uid) {
        alert("User belum login");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        nama,
        noTelp,
        lokasi: alamat,
        createdAt: new Date().toISOString(),
      });

      alert("Akun berhasil dibuat! & pastikan sudah verifikasi email.");
      router.push("/(auth)/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <View style={containerStyles.container}>
      <View style={containerStyles.formContainer}>
        <Text style={textStyles.title}>Create Profile</Text>
        <TextInput
          style={inputStyles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
        <TextInput
          style={inputStyles.input}
          placeholder="No Telepon"
          value={noTelp}
          onChangeText={setNoTelp}
          keyboardType="phone-pad"
        />
        <TextInput
          style={inputStyles.input}
          placeholder="Alamat Lokasi"
          value={alamat}
          onChangeText={setAlamat}
        />

        <Pressable
          style={[buttonStyles.btnPrimary, buttonStyles.btnFull]}
          onPress={handleSignUp}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonStyles.btnPrimaryText}>Simpan</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

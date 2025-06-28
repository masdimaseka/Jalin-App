import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useGetLocation = () => {
  const [alamat, setAlamat] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Izin lokasi ditolak");
          return;
        }

        const lokasi = await Location.getCurrentPositionAsync({});
        const [geo] = await Location.reverseGeocodeAsync({
          latitude: lokasi.coords.latitude,
          longitude: lokasi.coords.longitude,
        });

        if (geo?.formattedAddress) {
          setAlamat(geo.formattedAddress);
        } else {
          setErrorMsg("Alamat tidak ditemukan");
        }
      } catch {
        setErrorMsg("Gagal mendapatkan lokasi");
      }
    };

    fetchLocation();
  }, []);

  return { alamat, setAlamat, errorMsg };
};

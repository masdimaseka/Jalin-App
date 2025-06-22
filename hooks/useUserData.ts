import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export function useUserData() {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) {
        setUserData(null);
        setLoadingUserData(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("Data user tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userData, loadingUserData, authUser: user, authLoading: loading };
}

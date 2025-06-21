import { useContext } from "react";
import { Redirect } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function AppIndex() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Redirect href={user?.emailVerified ? "/(app)/(tabs)" : "/(auth)/login"} />
  );
}

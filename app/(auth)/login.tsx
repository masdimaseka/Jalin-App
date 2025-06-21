import { Colors } from "@/constant/theme";
import { useRouter, Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  if (loading) return null;

  if (user?.emailVerified) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert(`Lengkapi email dan password`);
      return;
    }

    setLoginLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert(
          "Email belum diverifikasi. Silakan cek email dan klik link verifikasi."
        );
        await auth.signOut();
        return;
      }

      console.log("Login sukses:", user);
      router.replace("/(app)/(tabs)");
    } catch (error: any) {
      console.error("Login gagal:", error);
      alert("Gagal login: " + error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>
            {loginLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {loginLoading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={{ marginTop: 10 }}
          />
        )}

        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => router.push("/(auth)/signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 200,
    marginBottom: 40,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 14,
    color: "#444",
    marginTop: 10,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

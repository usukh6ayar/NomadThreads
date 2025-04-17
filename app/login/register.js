// app/login/register.js
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (email && password && password === confirmPassword) {
      router.push({ pathname: "/login/verify", params: { email } });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Бүртгүүлэх</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Таны нэр</Text>
          <TextInput
            placeholder="Нэрээ оруулна уу"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>И-мэйл</Text>
          <TextInput
            placeholder="И-мэйл хаягаа оруулна уу"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Нууц үг</Text>
          <TextInput
            placeholder="Нууц үгээ оруулна уу"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>Нууц үг давтах</Text>
          <TextInput
            placeholder="Нууц үгээ давтана уу"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.loginText}>Бүртгэлтэй хэрэглэгч?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Нэвтрэх</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#F8F8F8",
  },
  registerButton: {
    backgroundColor: "#F2994A",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: "#F2994A",
    fontWeight: "bold",
  },
});

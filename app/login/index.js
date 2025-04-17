// app/login/index.js
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Алдаа", "И-мэйл болон нууц үг оруулна уу");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        router.replace("/shop");
      } else {
        Alert.alert("Алдаа", "И-мэйл эсвэл нууц үг буруу байна");
      }
    } catch (error) {
      Alert.alert("Алдаа", "Нэвтрэх үйл явцад алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/deel-cover.png")}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Тавтай морилно уу!</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="И-мэйл хаягаа оруулна уу"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Нууц үгээ оруулна уу"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Нууц үгээ мартсан уу?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.registerText}>Бүртгэлгүй хэрэглэгч?</Text>
          <TouchableOpacity onPress={() => router.push("/login/register")}>
            <Text style={styles.registerLink}>Бүртгүүлэх</Text>
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
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#666666",
  },
  loginButton: {
    backgroundColor: "#F2994A",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: "#F2994A",
    fontWeight: "bold",
  },
});

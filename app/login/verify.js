// app/login/verify.js
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function VerifyScreen() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (code.length === 6) {
      // In a real app, this would verify the code with a backend
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Имэйл баталгаажуулах</Text>

      <Text style={styles.description}>
        <Text>{email}</Text> хаяг руу баталгаажуулах код илгээлээ
      </Text>

      <View style={styles.codeContainer}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <View key={index} style={styles.codeBox}>
            <Text style={styles.codeText}>{code[index] || ""}</Text>
          </View>
        ))}
      </View>

      <TextInput
        value={code}
        onChangeText={(text) => {
          // Only allow numbers and limit to 6 digits
          const numericCode = text.replace(/[^0-9]/g, "").substring(0, 6);
          setCode(numericCode);
        }}
        keyboardType="numeric"
        maxLength={6}
        style={styles.hiddenInput}
        autoFocus
      />

      <TouchableOpacity
        style={[
          styles.verifyButton,
          code.length === 6 ? styles.activeButton : {},
        ]}
        onPress={handleVerify}
        disabled={code.length !== 6}
      >
        <Text style={styles.verifyButtonText}>Баталгаажуулах</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Код хүлээж аваагүй?</Text>
        <TouchableOpacity>
          <Text style={styles.resendButton}>Дахин илгээх</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666666",
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  codeBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  codeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: "100%",
  },
  verifyButton: {
    backgroundColor: "#CCCCCC",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  activeButton: {
    backgroundColor: "#F2994A",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  resendText: {
    marginRight: 5,
    color: "#666666",
  },
  resendButton: {
    color: "#F2994A",
    fontWeight: "bold",
  },
});

import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { brandDetails } from "./brandData";
import { LinearGradient } from "expo-linear-gradient";

export default function BrandDetailScreen() {
  const { id } = useLocalSearchParams();
  const brand = brandDetails[id];
  const router = useRouter();
  const handleCall = () => {
    Alert.alert("Утасдах", `${brand.phone} дугаарт холбогдох уу?`, [
      { text: "Цуцлах", style: "cancel" },
      { text: "Залгах", onPress: () => Linking.openURL(`tel:${brand.phone}`) },
    ]);
  };

  const comments = [
    {
      name: "Өсөхбаяр",
      text: "Өргөн сонголттой дэлгүүр байна.",
    },
    {
      name: "Өсөхбаяр",
      text: "Үнэхээр гоё дэлгүүр байна.",
    },
    {
      name: "Өсөхбаяр",
      text: "Дараа дахин очно.",
    },
  ];

  if (!brand) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Брэнд олдсонгүй</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileHeader}>
          <Image
            source={require("../../assets/deel-cover.png")}
            style={styles.banner}
          />
          <View style={styles.profileInfo}>
            <Image
              source={require("../../assets/dulguun.jpeg")}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{brand.name}</Text>
          </View>
        </View>

        {/* Бидний тухай хэсэг */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Бидний тухай</Text>
          <Text style={styles.sectionText}>{brand.description}</Text>
        </View>
        {/* Байршил хэсэг */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Байршил</Text>
          <View style={styles.infoItem}>
            <Ionicons name="location" size={20} color="#666" />
            <Text style={styles.infoText}>{brand.address}</Text>
          </View>
        </View>
        {/* Цагийн хуваарь хэсэг */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ажлын цаг</Text>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color="#666" />
            <Text style={styles.infoText}>{brand.workHours}</Text>
          </View>
        </View>
        {/* Сэтгэгдлүүд */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Сэтгэгдлүүд</Text>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentCard}>
              <View style={styles.commentHeader}>
                <Ionicons name="person-circle" size={24} color="#888" />
                <Text style={styles.commentName}>{comment.name}</Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Холбоо барих хэсэг */}
      <View style={styles.fixedFooter}>
        <TouchableOpacity onPress={handleCall} style={styles.footerButton}>
          <LinearGradient
            colors={["#FFC107", "#D32F2F"]}
            style={styles.gradientButtonFull}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.footerButtonText}>Холбоо барих</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    paddingBottom: 100,
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#34495e",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  commentCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  commentName: {
    fontWeight: "600",
    color: "#2c3e50",
  },
  commentText: {
    color: "#34495e",
    fontSize: 14,
  },
  contactSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
  },
  contactButtonText: {
    color: "white",
    fontWeight: "500",
  },
  profileHeader: {
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "absolute",
    bottom: -10,
    left: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginLeft: 16,
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  footerButton: {
    width: "100%",
    paddingBottom: 16,
  },

  gradientButtonFull: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },

  footerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
    zIndex: 99, // ensure it stays above everything
  },
});

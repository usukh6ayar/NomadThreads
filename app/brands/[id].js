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
import BackButton from "../../components/BackButton";

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

  const renderComment = (comment, index) => (
    <View key={index} style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="person-circle" size={32} color="#F2994A" />
          <View>
            <Text style={styles.commentName}>{comment.name}</Text>
            <Text style={{ color: "#636E72", fontSize: 12 }}>
              2 өдрийн өмнө
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 2 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons key={star} name="star" size={14} color="#FFB800" />
          ))}
        </View>
      </View>
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );

  if (!brand) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Брэнд олдсонгүй</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={[styles.container]}>
        <View style={styles.profileHeader}>
          <Image
            source={require("../../assets/iveel.jpg")}
            style={styles.banner}
          />
          <View style={styles.profileInfo}>
            <Image
              source={require("../../assets/emegteitsamts.jpg")}
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
          {comments.map(renderComment)}
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
  profileHeader: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  banner: {
    width: "100%",
    height: 220,
    borderRadius: 0,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#F2994A",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2D3436",
    marginLeft: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
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
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F2994A",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  commentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D3436",
  },
  commentText: {
    color: "#636E72",
    fontSize: 14,
    lineHeight: 20,
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
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: 1,
    borderTopColor: "#F1F2F6",
  },
  footerButton: {
    width: "100%",
    paddingBottom: 16,
  },

  gradientButtonFull: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  footerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

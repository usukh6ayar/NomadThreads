// app/brands/index.js
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { brandDetails } from "./brandData";
import BottomTabs from "../../components/BottomTabs";

const brands = Object.keys(brandDetails).map((key) => ({
  id: key,
  name: brandDetails[key].name,
  short: brandDetails[key].short,
  image: brandDetails[key].image,
}));

export default function BrandsScreen() {
  const router = useRouter();

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      style={styles.brandCard}
      onPress={() => router.push(`/brands/${item.id}`)}
    >
      {/* Зураг */}
      {item.image && (
        <Image
          source={item.image} // uri: хасаж, шууд image-ийг дамжуулна
          style={styles.brandImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandDescription}>{item.short}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Брэндүүд</Text>
      </View>

      <FlatList
        data={brands}
        renderItem={renderBrandItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.brandList}
      />

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F2994A",
    textAlign: "center",
  },
  brandList: {
    padding: 20,
    paddingBottom: 100,
  },
  brandCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  brandImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: "#f0f0f0",
  },
  brandInfo: {
    flex: 1,
    gap: 6,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
  },
  brandDescription: {
    fontSize: 14,
    color: "#636E72",
    lineHeight: 20,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  activeTab: {
    borderTopColor: "#F2994A",
  },
  tabText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  activeTabText: {
    fontSize: 12,
    color: "#F2994A",
    fontWeight: "bold",
    marginTop: 2,
  },
});

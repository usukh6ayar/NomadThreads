import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import BottomTabs from "../../components/BottomTabs";

const categories = [
  { id: "deel", name: "Дээл", icon: "shirt-outline", count: 24 },
  { id: "boots", name: "Гутал", icon: "footsteps-outline", count: 16 },
  {
    id: "accessories",
    name: "Гоёл чимэглэл",
    icon: "diamond-outline",
    count: 32,
  },
  { id: "gifts", name: "Бэлэг дурсгал", icon: "gift-outline", count: 20 },
];

const sampleImages = [
  "https://via.placeholder.com/70",
  "https://via.placeholder.com/70",
  "https://via.placeholder.com/70",
  "https://via.placeholder.com/70",
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => router.push(`/categories/${item.id}`)}
    >
      <View style={styles.imageGrid}>
        {sampleImages.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.gridImage} />
        ))}
      </View>
      <View style={styles.nameRow}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>({item.count})</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <Text style={styles.headerTitle}>Ангилал</Text>

      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Хайх..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
      </View>

      {/* Grid */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
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
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    margin: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: "#1A1A1A",
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    gap: 6,
  },
  gridImage: {
    width: "48%",
    height: 70,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: "#F5F5F7",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F7",
    width: "100%",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 6,
    color: "#1A1A1A",
  },
  categoryCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
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

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
      {/* 🔍 Search Input */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Ангилал хайх..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* 🏷️ Header */}
      <Text style={styles.headerTitle}>Ангилал</Text>

      {/* 🧩 Grid */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  gridImage: {
    width: "47%",
    height: 60,
    marginBottom: 6,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 6,
  },
  categoryCount: {
    fontSize: 14,
    color: "#888",
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
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
});

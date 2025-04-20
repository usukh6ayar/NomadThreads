import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

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

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ангилал</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => router.push(`/categories/${category.id}`)}
            >
              <View style={styles.categoryInfo}>
                <Ionicons name={category.icon} size={24} color="#666" />
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <View style={styles.categoryMeta}>
                <Text style={styles.categoryCount}>{category.count}</Text>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/shop")}
          >
            <Ionicons name="home-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Нүүр</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/brands")}
          >
            <Ionicons name="storefront-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Дэлгүүр</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
            <Ionicons name="grid" size={24} color="#F2994A" />
            <Text style={styles.activeTabText}>Ангилал</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="person-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Профайл</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 16,
    marginLeft: 12,
  },
  categoryMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryCount: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
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

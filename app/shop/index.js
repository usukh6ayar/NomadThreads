// app/shop/index.js
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock data for the products
const PRODUCTS = [
  {
    id: "1",
    name: "Торгон дээл",
    price: 149000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000", "#69445c", "#d4915d", "#fff"],
    images: ["../../assets/deel1.png"],
    description: "Үндэсний хээтэй, уламжлалт загвар. Торгон материал.",
    category: "deel",
  },
  {
    id: "2",
    name: "Хүрэм малгай",
    price: 199000,
    sizes: ["S", "M", "L"],
    colors: ["#000", "#392f54", "#724b3d"],
    images: ["../../assets/deel2.png"],
    description: "Хөвсгөл нутгийн уламжлалт загвар.",
    category: "deel",
  },
  {
    id: "3",
    name: "Монгол гутал",
    price: 129000,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#000", "#392f54"],
    images: ["../../assets/boots.png"],
    description: "Гар аргаар урласан, жинхэнэ арьсан монгол гутал.",
    category: "boots",
  },
  {
    id: "4",
    name: "Тоглоом",
    price: 39000,
    colors: ["#000", "#69445c", "#d4915d"],
    images: ["../../assets/toy.png"],
    description: "Монгол уламжлалт тоглоом.",
    category: "toy",
  },
];

const CATEGORIES = [
  { id: "all", name: "Бүгд" },
  { id: "deel", name: "Дээл" },
  { id: "boots", name: "Гутал" },
  { id: "accessories", name: "Гоёл" },
  { id: "toy", name: "Тоглоом" },
];

export default function ShopScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/shop/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/deel-cover.png")}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₮{item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Худалдан авах</Text>
        <TouchableOpacity onPress={() => router.push("/shop/favorites")}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategory,
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category.id && styles.activeCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.brandsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Брэндүүд</Text>
          <TouchableOpacity onPress={() => router.push("/brands")}>
            <Text style={styles.seeAllText}>Бүгдийг харах</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandsScroll}
        >
          <TouchableOpacity
            style={styles.brandItem}
            onPress={() => router.push("/brands/borgolj")}
          >
            <View style={styles.brandCircle}>
              <Text style={styles.brandInitial}>Б</Text>
            </View>
            <Text style={styles.brandName}>Бөргөлжин</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.brandItem}
            onPress={() => router.push("/brands/zaya")}
          >
            <View style={styles.brandCircle}>
              <Text style={styles.brandInitial}>З</Text>
            </View>
            <Text style={styles.brandName}>Заяа</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.brandItem}
            onPress={() => router.push("/brands")}
          >
            <View style={styles.brandCircle}>
              <Text style={styles.brandInitial}>М</Text>
            </View>
            <Text style={styles.brandName}>Мөнхжин</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.brandItem}
            onPress={() => router.push("/brands")}
          >
            <View style={styles.brandCircle}>
              <Text style={styles.brandInitial}>Г</Text>
            </View>
            <Text style={styles.brandName}>Говь</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Бүтээгдэхүүн</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.productsContainer}
        />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="home" size={24} color="#F2994A" />
          <Text style={styles.activeTabText}>Нүүр</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/brands")}
        >
          <Ionicons name="storefront-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Дэлгүүр</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/categories")}
        >
          <Ionicons name="grid-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Ангилал</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  categoriesScroll: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  activeCategory: {
    backgroundColor: "#F2994A",
  },
  categoryText: {
    color: "#333",
  },
  activeCategoryText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  seeAllText: {
    color: "#F2994A",
    fontWeight: "500",
  },
  brandsSection: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  brandsScroll: {
    paddingHorizontal: 10,
  },
  brandItem: {
    alignItems: "center",
    marginHorizontal: 15,
    width: 60,
  },
  brandCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  brandInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  brandName: {
    fontSize: 12,
    textAlign: "center",
  },
  productsContainer: {
    paddingHorizontal: 7,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F5F5F5",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#F2994A",
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

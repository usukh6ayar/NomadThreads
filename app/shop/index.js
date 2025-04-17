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
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

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
  },
  {
    id: "2",
    name: "Хүрэм малгай",
    price: 199000,
    sizes: ["S", "M", "L"],
    colors: ["#000", "#392f54", "#724b3d"],
    images: ["../../assets/deel2.png"],
    description: "Хөвсгөл нутгийн уламжлалт загвар.",
  },
  {
    id: "3",
    name: "Монгол гутал",
    price: 129000,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#000", "#392f54"],
    images: ["../../assets/boots.png"],
    description: "Гар аргаар урласан, жинхэнэ арьсан монгол гутал.",
  },
  {
    id: "4",
    name: "Тоглоом",
    price: 39000,
    colors: ["#000", "#69445c", "#d4915d"],
    images: ["../../assets/toy.png"],
    description: "Монгол уламжлалт тоглоом.",
  },
];

export default function ShopScreen() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

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
          <AntDesign name="hearto" size={20} color="black" />
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
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Худалдан авах</Text>
        <TouchableOpacity onPress={() => router.push("/shop/favorites")}>
          <Feather name="heart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Төрөл сонгох</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            <TouchableOpacity
              style={[styles.categoryButton, styles.activeCategory]}
            >
              <Text style={styles.activeCategoryText}>Бүгд</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Дээл</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Гутал</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Гоёл</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Тоглоом</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Бүтээгдэхүүн</Text>
        <FlatList
          data={PRODUCTS}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="home" size={24} color="#999" />
          <Text style={styles.tabText}>Нүүр</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Feather name="shopping-bag" size={24} color="#F2994A" />
          <Text style={styles.activeTabText}>Дэлгүүр</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="map-pin" size={24} color="#999" />
          <Text style={styles.tabText}>Газрын зураг</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/settings")}
        >
          <Feather name="user" size={24} color="#999" />
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
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
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

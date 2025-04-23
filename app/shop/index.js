// app/shop/index.js
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomTabs from "../../components/BottomTabs";

// Mock data for the products
const PRODUCTS = [
  {
    id: "1",
    name: "Торгон дээл",
    price: 149000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000", "#69445c", "#d4915d", "#fff"],
    image: require("../../assets/dulguun.jpeg"),
    description: "Үндэсний хээтэй, уламжлалт загвар. Торгон материал.",
    category: "deel",
  },
  {
    id: "2",
    name: "Хүрэм малгай",
    price: 199000,
    sizes: ["S", "M", "L"],
    colors: ["#000", "#392f54", "#724b3d"],
    image: require("../../assets/deel-cover.png"),
    description: "Хөвсгөл нутгийн уламжлалт загвар.",
    category: "deel",
  },
  {
    id: "3",
    name: "Монгол гутал",
    price: 129000,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#000", "#392f54"],
    image: require("../../assets/deel-cover.png"),
    description: "Гар аргаар урласан, жинхэнэ арьсан монгол гутал.",
    category: "boots",
  },
  {
    id: "4",
    name: "Оюухай",
    price: 39000,
    colors: ["#000", "#69445c", "#d4915d"],
    image: require("../../assets/oyukhai.jpeg"),
    description: "Монгол уламжлалт дээл.",
    category: "deel",
  },
];

// Carousel images for the top slider
const CAROUSEL_IMAGES = [
  { id: "1", image: require("../../assets/ca1.jpg") },
  { id: "2", image: require("../../assets/ca2.jpeg") },
  { id: "3", image: require("../../assets/deel-cover.png") },
];

export default function ShopScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Added state for cart items
  const windowWidth = Dimensions.get("window").width;
  const carouselRef = useRef(null);

  // Carousel auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % CAROUSEL_IMAGES.length;
      setActiveIndex(nextIndex);

      // Manually scroll the FlatList to the next item
      if (carouselRef.current) {
        carouselRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Handle scroll event for the carousel
  const handleCarouselScroll = (event) => {
    const slideWidth = windowWidth;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/shop/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
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

  const renderCarouselItem = ({ item }) => (
    <View style={[styles.carouselItem, { width: windowWidth }]}>
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderHorizontalProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.horizontalProductCard}
      onPress={() => router.push(`/shop/${item.id}`)}
    >
      <View style={styles.horizontalImageContainer}>
        <Image
          source={item.image}
          style={styles.horizontalProductImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.horizontalProductName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.horizontalProductPrice}>
        ₮{item.price.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/shop/favorites")}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => router.push("/shop/cart")}
          >
            <Ionicons name="cart-outline" size={24} color="black" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={CAROUSEL_IMAGES}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true} // Allow manual scrolling
            onMomentumScrollEnd={handleCarouselScroll} // Update active index when scrolling ends
            contentContainerStyle={styles.carouselList}
            scrollEventThrottle={16}
            initialScrollIndex={activeIndex}
            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: windowWidth * index,
              index,
            })}
          />

          <View style={styles.paginationContainer}>
            {CAROUSEL_IMAGES.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.paginationDot,
                  activeIndex === idx ? styles.paginationDotActive : {},
                ]}
              />
            ))}
          </View>
        </View>

        {/* Recommended Products Section */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Санал болгох</Text>
            <TouchableOpacity
              onPress={() => router.push("/shop/recommendations")}
            >
              <Text style={styles.seeAllText}>Илүүг харах</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={PRODUCTS}
            renderItem={renderHorizontalProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalProductsContainer}
          />
        </View>

        {/* All Products Section */}
        <View style={styles.allProductsSection}>
          <Text style={styles.sectionTitle}>Бүтээгдэхүүн</Text>
          <FlatList
            data={PRODUCTS}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productsContainer}
          />
        </View>
      </ScrollView>

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
    flexDirection: "row",
    justifyContent: "flex-end", // Changed from space-between to flex-end
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cartContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#F2994A",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  scrollView: {
    flex: 1,
  },
  // Carousel Styles
  carouselContainer: {
    height: 200,
    position: "relative",
  },
  carouselList: {
    height: 200,
  },
  carouselItem: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#fff",
  },
  // Recommended Section Styles
  recommendedSection: {
    marginVertical: 15,
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
  horizontalProductsContainer: {
    paddingHorizontal: 10,
  },
  horizontalProductCard: {
    width: 140,
    marginHorizontal: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  horizontalImageContainer: {
    height: 140,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#F5F5F5",
  },
  horizontalProductImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  horizontalProductName: {
    fontSize: 14,
    fontWeight: "500",
  },
  horizontalProductPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3,
    color: "#F2994A",
  },
  // All Products Section
  allProductsSection: {
    marginTop: 5,
    marginBottom: 20,
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

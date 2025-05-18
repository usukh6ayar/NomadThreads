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
import { LinearGradient } from "expo-linear-gradient";

// Mock data for the products
const PRODUCTS = [
  {
    id: "1",
    name: "Торгон дээл",
    price: 149000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000", "#69445c", "#d4915d", "#fff"],
    image: require("../../assets/michel.jpeg"), // Шинэ зураг
    description: "Үндэсний хээтэй, уламжлалт загвар. Торгон материал.",
    category: "deel",
  },
  {
    id: "2",
    name: "Хүрэм малгай",
    price: 199000,
    sizes: ["S", "M", "L"],
    colors: ["#000", "#392f54", "#724b3d"],
    image: require("../../assets/eregtei hurem.jpg"), // Шинэ зураг
    description: "Хөвсгөл нутгийн уламжлалт загвар.",
    category: "deel",
  },
  {
    id: "3",
    name: "Монгол гутал",
    price: 129000,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#000", "#392f54"],
    image: require("../../assets/mongolgutal.jpg"), // Шинэ зураг
    description: "Гар аргаар урласан, жинхэнэ арьсан монгол гутал.",
    category: "boots",
  },
  {
    id: "4",
    name: "Оюухай",
    price: 39000,
    colors: ["#000", "#69445c", "#d4915d"],
    image: require("../../assets/trad.jpeg"), // Шинэ зураг
    description: "Монгол уламжлалт дээл.",
    category: "deel",
  },
];

// Carousel images for the top slider
const CAROUSEL_IMAGES = [
  {
    id: "1",
    image: require("../../assets/ca1.jpg"),
    title: "Explore Mongolian Elegance",
    description: "Discover stylish and traditional outfits for any occasion.",
  },
  {
    id: "2",
    image: require("../../assets/ca2.jpeg"),
    title: "Handcrafted Perfection",
    description: "Unique designs made with passion and precision.",
  },
  {
    id: "3",
    image: require("../../assets/ca1.jpg"),
    title: "Celebrate Heritage",
    description: "Wear the beauty of Mongolian culture.",
  },
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
      <TouchableOpacity
        style={styles.buyNowButton}
        onPress={() => alert("Худалдаж авах дарагдав!")}
      >
        <Text style={styles.buyNowText}>Худалдаж авах</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCarouselItem = ({ item }) => (
    <View style={[styles.carouselItem, { width: windowWidth }]}>
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.carouselTextContainer}
      >
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.carouselButton}
          onPress={() => alert("Explore clicked!")}
        >
          <Text
            style={[
              styles.carouselButtonText,
              { fontSize: 16, fontWeight: "600" },
            ]}
          >
            Explore Now
          </Text>
        </TouchableOpacity>
      </LinearGradient>
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
        <Text style={styles.headerTitle}>NomadThreads</Text>
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
            onMomentumScrollEnd={handleCarouselScroll}
            decelerationRate="fast"
            snapToAlignment="center"
            snapToInterval={windowWidth}
            bounces={false}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F2994A",
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  cartContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#F2994A",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  // Carousel Styles
  carouselContainer: {
    height: 260,
    position: "relative",
    marginBottom: 20,
  },
  carouselItem: {
    height: 260,
    position: "relative",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  carouselTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
    paddingTop: 60,
  },
  carouselTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  carouselDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20,
    lineHeight: 22,
  },
  carouselButton: {
    backgroundColor: "#F2994A",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignSelf: "flex-start",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 4,
    transition: "all 0.3s ease",
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: "#F2994A",
  },
  // Recommended Section Styles
  recommendedSection: {
    marginVertical: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  seeAllText: {
    color: "#F2994A",
    fontWeight: "600",
    fontSize: 14,
  },
  horizontalProductsContainer: {
    paddingHorizontal: 10,
  },
  horizontalProductCard: {
    width: 160,
    marginHorizontal: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  horizontalImageContainer: {
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
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

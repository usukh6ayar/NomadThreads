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
  Pressable,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
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
    image: require("../../assets/michel.jpeg"),
    description: "Үндэсний хээтэй, уламжлалт загвар. Торгон материал.",
    category: "deel",
  },
  {
    id: "2",
    name: "Хүрэм малгай",
    price: 199000,
    sizes: ["S", "M", "L"],
    colors: ["#000", "#392f54", "#724b3d"],
    image: require("../../assets/eregtei hurem.jpg"),
    description: "Хөвсгөл нутгийн уламжлалт загвар.",
    category: "deel",
  },
  {
    id: "3",
    name: "Монгол гутал",
    price: 129000,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#000", "#392f54"],
    image: require("../../assets/mongolgutal.jpg"),
    description: "Гар аргаар урласан, жинхэнэ арьсан монгол гутал.",
    category: "boots",
  },
  {
    id: "4",
    name: "Оюухай",
    price: 39000,
    colors: ["#000", "#69445c", "#d4915d"],
    image: require("../../assets/trad.jpeg"),
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

// Figma Product Detail UI constants
const MATERIALS = ["Торго", "Даавуу"];
const ETHNICITIES = ["Халх", "Хүннү", "Буриад"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Улаан", code: "#D32F2F" },
  { name: "Шар", code: "#ECA61B" },
  { name: "Цэнхэр", code: "#1976D2" },
  { name: "Ногоон", code: "#388E3C" },
];
const SIMILAR_PRODUCTS = [
  { id: "2", image: require("../../assets/deel-cover.png") },
  { id: "3", image: require("../../assets/deel-cover.png") },
  { id: "4", image: require("../../assets/deel-cover.png") },
];

export default function ShopScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const carouselRef = useRef(null);

  // Figma Product Detail states
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [ethnicity, setEthnicity] = useState(ETHNICITIES[0]);
  const [size, setSize] = useState(SIZES[2]);
  const [color, setColor] = useState(COLORS[0].code);
  const [rating, setRating] = useState(4);

  // Dummy review
  const review = {
    user: {
      name: "Өсөхбаяр",
      avatar: require("../../assets/avatar.png"),
    },
    rating: 4,
    comment: "Маш гоё материалтай, биед эвтэйхэн байна!",
  };

  // Carousel auto-scroll functionality
  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) {
        const nextIndex = (activeIndex + 1) % CAROUSEL_IMAGES.length;
        setActiveIndex(nextIndex);
        if (carouselRef.current) {
          carouselRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
            viewPosition: 0,
            viewOffset: 0,
          });
        }
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeIndex]);

  const handleCarouselScroll = (event) => {
    const slideWidth = windowWidth;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const openProductDetail = (item) => {
    setSelectedProduct(item);
    setShowProductDetail(true);
    setFavorite(false);
    setMaterial(MATERIALS[0]);
    setEthnicity(ETHNICITIES[0]);
    setSize(SIZES[2]);
    setColor(COLORS[0].code);
    setRating(4);
  };

  // --- Product Detail Figma UI ---
  const ProductDetail = ({ product }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.detailFloatingBackBtn}
        onPress={() => setShowProductDetail(false)}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView style={styles.detailContainer}>
        <Image source={product.image} style={styles.detailImage} />
        <View style={styles.detailInfo}>
          <View style={styles.detailRowBetween}>
            <Text style={styles.detailName}>{product.name}</Text>
            <TouchableOpacity onPress={() => setFavorite((f) => !f)}>
              <AntDesign
                name={favorite ? "heart" : "hearto"}
                size={28}
                color={favorite ? "#D32F2F" : "#bbb"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.detailPrice}>
            ₮{product.price.toLocaleString()}
          </Text>
          <Text style={styles.detailDesc}>{product.description}</Text>

          <Text style={styles.detailSectionTitle}>Үзүүлэлтүүд</Text>
          <Text style={styles.detailSubTitle}>Материал</Text>
          <View style={styles.detailRow}>
            {MATERIALS.map((m) => (
              <Pressable
                key={m}
                style={[
                  styles.detailChip,
                  material === m && styles.detailChipSelected,
                ]}
                onPress={() => setMaterial(m)}
              >
                <Text
                  style={
                    material === m
                      ? styles.detailChipTextSelected
                      : styles.detailChipText
                  }
                >
                  {m}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.detailSubTitle}>Үндэстэн</Text>
          <View style={styles.detailRow}>
            {ETHNICITIES.map((e) => (
              <Pressable
                key={e}
                style={[
                  styles.detailChip,
                  ethnicity === e && styles.detailChipSelected,
                ]}
                onPress={() => setEthnicity(e)}
              >
                <Text
                  style={
                    ethnicity === e
                      ? styles.detailChipTextSelected
                      : styles.detailChipText
                  }
                >
                  {e}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.detailSubTitle}>Хэмжээ</Text>
          <View style={styles.detailRow}>
            {SIZES.map((s) => (
              <Pressable
                key={s}
                style={[
                  styles.detailSizeBtn,
                  size === s && styles.detailSizeBtnSelected,
                ]}
                onPress={() => setSize(s)}
              >
                <Text
                  style={
                    size === s
                      ? styles.detailSizeTextSelected
                      : styles.detailSizeText
                  }
                >
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.detailSubTitle}>Өнгө</Text>
          <View style={styles.detailRow}>
            {COLORS.map((c) => (
              <Pressable
                key={c.code}
                style={[
                  styles.detailColorCircle,
                  color === c.code && styles.detailColorCircleSelected,
                  { backgroundColor: c.code },
                ]}
                onPress={() => setColor(c.code)}
              />
            ))}
          </View>
          <Text style={styles.detailSectionTitle}>Үнэлгээ & Сэтгэгдэл</Text>
          <View style={styles.detailRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <AntDesign
                  name={i <= rating ? "star" : "staro"}
                  size={28}
                  color="#ECA61B"
                  style={{ marginRight: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.detailReviewContainer}>
            <Image source={review.user.avatar} style={styles.detailAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.detailReviewerName}>{review.user.name}</Text>
              <View style={styles.detailRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <AntDesign
                    key={i}
                    name={i <= review.rating ? "star" : "staro"}
                    size={18}
                    color="#ECA61B"
                  />
                ))}
              </View>
              <Text style={styles.detailReviewText}>{review.comment}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.detailAllReviewsBtn}>
            <Text style={styles.detailAllReviewsText}>
              Бүх сэтгэгдлийг үзэх
            </Text>
          </TouchableOpacity>
          <Text style={styles.detailSectionTitle}>Төстэй бараанууд</Text>
          <FlatList
            data={SIMILAR_PRODUCTS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.detailSimilarProduct}
                onPress={() => openProductDetail(item)}
              >
                <Image source={item.image} style={styles.detailSimilarImage} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.detailBottomButtons}>
            <TouchableOpacity
              style={[styles.detailGradientBtn, { flex: 1 }]}
              onPress={() => {
                /* Add to cart logic */
              }}
            >
              <LinearGradient
                colors={["#ECA61B", "#D32F2F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.detailGradient}
              >
                <Text style={styles.detailGradientBtnText}>Сагсанд нэмэх</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.detailGradientBtn, { flex: 1.2 }]}
              onPress={() => router.push("/shop/checkout")}
            >
              <LinearGradient
                colors={["#ECA61B", "#D32F2F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.detailGradient}
              >
                <Text style={styles.detailGradientBtnText}>Худалдаж авах</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  // --- Main ShopScreen Render ---
  if (showProductDetail && selectedProduct) {
    return <ProductDetail product={selectedProduct} />;
  }

  // --- Main Shop List UI ---
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => openProductDetail(item)}
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
        onPress={() => openProductDetail(item)}
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
        loading="lazy"
        progressiveRenderingEnabled={true}
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
      onPress={() => openProductDetail(item)}
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
        bounces={false}
        overScrollMode="never"
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
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
            overScrollMode="never"
            removeClippedSubviews={true}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={2}
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
            bounces={false}
            overScrollMode="never"
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
            bounces={false}
            overScrollMode="never"
          />
        </View>
      </ScrollView>

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // --- Main Shop List Styles ---
  container: { flex: 1, backgroundColor: "#fff" },
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
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 20 },
  cartContainer: { position: "relative" },
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
  scrollView: { flex: 1 },
  carouselContainer: { height: 260, position: "relative", marginBottom: 20 },
  carouselItem: { height: 260, position: "relative" },
  carouselImage: { width: "100%", height: "100%", borderRadius: 0 },
  carouselTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
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
  },
  paginationDotActive: { width: 24, backgroundColor: "#F2994A" },
  recommendedSection: { marginVertical: 20, paddingTop: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#222" },
  seeAllText: { color: "#F2994A", fontWeight: "600", fontSize: 14 },
  horizontalProductsContainer: { paddingHorizontal: 10 },
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
  horizontalProductImage: { width: "100%", height: "100%", borderRadius: 8 },
  horizontalProductName: { fontSize: 14, fontWeight: "500" },
  horizontalProductPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3,
    color: "#F2994A",
  },
  allProductsSection: { marginTop: 5, marginBottom: 20 },
  productsContainer: { paddingHorizontal: 7, paddingBottom: 20 },
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
  productImage: { width: "100%", height: "100%", borderRadius: 8 },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 5,
  },
  productName: { fontSize: 16, fontWeight: "500" },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#F2994A",
  },
  buyNowButton: {
    marginTop: 10,
    backgroundColor: "#F2994A",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  buyNowText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  // --- Figma Product Detail Styles ---
  detailContainer: { flex: 1, backgroundColor: "#fff" },
  detailImage: { width: "100%", height: 320, resizeMode: "cover" },
  detailInfo: { padding: 20 },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  detailRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailName: { fontSize: 22, fontWeight: "bold" },
  detailPrice: {
    fontSize: 20,
    color: "#F2994A",
    fontWeight: "bold",
    marginBottom: 12,
  },
  detailDesc: { fontSize: 16, color: "#444", marginBottom: 24 },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  detailSubTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#888",
  },
  detailChip: {
    borderWidth: 1,
    borderColor: "#ECA61B",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  detailChipSelected: { backgroundColor: "#ECA61B", borderColor: "#ECA61B" },
  detailChipText: { color: "#ECA61B", fontWeight: "bold" },
  detailChipTextSelected: { color: "#fff", fontWeight: "bold" },
  detailSizeBtn: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  detailSizeBtnSelected: { backgroundColor: "#ECA61B", borderColor: "#ECA61B" },
  detailSizeText: { color: "#444", fontWeight: "bold" },
  detailSizeTextSelected: { color: "#fff", fontWeight: "bold" },
  detailColorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#eee",
  },
  detailColorCircleSelected: { borderColor: "#ECA61B", borderWidth: 3 },
  detailReviewContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    marginBottom: 8,
  },
  detailAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  detailReviewerName: { fontWeight: "bold", fontSize: 15, marginBottom: 2 },
  detailReviewText: { fontSize: 15, color: "#444", marginTop: 4 },
  detailAllReviewsBtn: {
    marginTop: 8,
    marginBottom: 16,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  detailAllReviewsText: { color: "#ECA61B", fontWeight: "bold" },
  detailSimilarProduct: {
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
    width: 100,
    height: 120,
  },
  detailSimilarImage: { width: "100%", height: "100%", resizeMode: "cover" },
  detailBottomButtons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === "ios" ? 30 : 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  detailGradientBtn: {
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 50,
  },
  detailGradient: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  detailGradientBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  detailFloatingBackBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

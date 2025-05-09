// app/shop/[productId].js
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

// Mock data for the products (same as in index.js)
const PRODUCTS = [
  {
    id: "1",
    name: "Торгон дээл",
    price: 149000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000", "#69445c", "#d4915d", "#fff"],
    images: ["../../assets/aaaw.jpg"],
    description: "Үндэсний хээтэй, уламжлалт загвар. Торгон материал.",
  },
  {
    id: "2",
    name: "Хүрэм малгай",
    price: 199000,
    sizes: ["S", "M", "L"],
    colors: ["#000", "#392f54", "#724b3d"],
    images: ["../../assets/eregtei hurem.jpg"],
    description: "Хөвсгөл нутгийн уламжлалт загвар.",
  },
  {
    id: "3",
    name: "Монгол гутал",
    price: 129000,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#000", "#392f54"],
    images: ["../../assets/mongolgutal.jpg"],
    description: "Гар аргаар урласан, жинхэнэ арьсан монгол гутал.",
  },
  {
    id: "4",
    name: "Толгойн гоёл",
    price: 39000,
    colors: ["#000", "#69445c", "#d4915d"],
    images: ["../../assets/trad.jpeg"],
    description: "Монгол уламжлалт эмэгтэйчүүдийн үсний болон толгойн гоёл.",
  },
];

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(product)}>
          <Ionicons
            name={isFavorite(product.id) ? "heart" : "heart-outline"}
            size={24}
            color="#F2994A"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/deel-cover.png")}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            ₮{product.price.toLocaleString()}
          </Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          {product.colors && (
            <View style={styles.optionSection}>
              <Text style={styles.optionTitle}>Өнгө сонгох</Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColorOption,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={color === "#fff" ? "#000" : "#fff"}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {product.sizes && (
            <View style={styles.optionSection}>
              <Text style={styles.optionTitle}>Хэмжээ сонгох</Text>
              <View style={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeOption,
                      selectedSize === size && styles.selectedSizeOption,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.quantitySection}>
            <Text style={styles.optionTitle}>Тоо ширхэг</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalTitle}>Нийт үнэ:</Text>
          <Text style={styles.totalValue}>
            ₮{(product.price * quantity).toLocaleString()}
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.addToCartButton]}
            onPress={() => {
              if (!selectedSize && product.sizes) {
                alert("Хэмжээ сонгоно уу");
                return;
              }
              if (!selectedColor && product.colors) {
                alert("Өнгө сонгоно уу");
                return;
              }
              addToCart(product, quantity, selectedSize, selectedColor);
              alert("Сагсанд нэмэгдлээ");
            }}
          >
            <Text style={styles.buttonText}>Сагсанд нэмэх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buyNowButton]}
            onPress={() => {
              if (!selectedSize && product.sizes) {
                alert("Хэмжээ сонгоно уу");
                return;
              }
              if (!selectedColor && product.colors) {
                alert("Өнгө сонгоно уу");
                return;
              }
              addToCart(product, quantity, selectedSize, selectedColor);
              router.push("/shop/checkout");
            }}
          >
            <Text style={styles.buyNowButtonText}>Шууд авах</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F5F5F5",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F2994A",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  optionSection: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: "row",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#F2994A",
  },
  sizeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeOption: {
    borderColor: "#F2994A",
    backgroundColor: "rgba(242, 153, 74, 0.1)",
  },
  sizeText: {
    fontSize: 16,
  },
  selectedSizeText: {
    color: "#F2994A",
    fontWeight: "bold",
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  bottomBar: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalPrice: {
    marginBottom: 12,
  },
  totalTitle: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F2994A",
  },
  buyNowButton: {
    backgroundColor: "#F2994A",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#F2994A",
  },
  buyNowButton: {
    backgroundColor: "#F2994A",
  },
  buyNowButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
});

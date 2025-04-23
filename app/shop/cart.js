import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  const handleQuantityChange = (item, increment) => {
    const newQuantity = item.quantity + (increment ? 1 : -1);
    if (newQuantity > 0) {
      updateQuantity(item.id, item.size, item.color, newQuantity);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Таны сагс</Text>
        <View style={{ width: 24 }} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyCartText}>Таны сагс хоосон байна</Text>
          <TouchableOpacity
            style={styles.continueShopping}
            onPress={() => router.back()}
          >
            <Text style={styles.continueShoppingText}>Худалдан авалт хийх</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartItems}>
            {items.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={styles.productOptions}>
                    {item.size && (
                      <View style={styles.optionChip}>
                        <Text style={styles.optionText}>
                          Хэмжээ: {item.size}
                        </Text>
                      </View>
                    )}
                    {item.color && (
                      <View style={styles.optionChip}>
                        <View
                          style={[
                            styles.colorDot,
                            { backgroundColor: item.color },
                          ]}
                        />
                        <Text style={styles.optionText}>Өнгө</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.productPrice}>
                    ₮{item.price.toLocaleString()}
                  </Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item, false)}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item, true)}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id, item.size, item.color)}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Нийт дүн:</Text>
              <Text style={styles.totalAmount}>
                ₮{getTotal().toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => router.push("/shop/checkout")}
            >
              <Text style={styles.checkoutButtonText}>Захиалга хийх</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  cartItems: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  productOptions: {
    flexDirection: "row",
    marginBottom: 4,
  },
  optionChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  optionText: {
    fontSize: 12,
    color: "#666",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F2994A",
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: "#666",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F2994A",
  },
  checkoutButton: {
    backgroundColor: "#F2994A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  continueShopping: {
    marginTop: 20,
  },
  continueShoppingText: {
    color: "#F2994A",
    fontSize: 16,
    fontWeight: "600",
  },
});

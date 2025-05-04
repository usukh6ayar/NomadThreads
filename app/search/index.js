import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../constants/dummyProducts";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());

    // Add additional filter logic here if needed
    return matchesQuery;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Бүтээгдэхүүн хайх..."
            placeholderTextColor="#aaa"
            value={query}
            onChangeText={setQuery}
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          onPress={() => router.push("/search/filter")}
          style={filters.active ? styles.activeFilterButton : null}
        >
          <Ionicons name="options" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Product List / No Results Message */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={64} color="#ccc" />
          <Text style={styles.noResultsText}>
            Хайлтанд тохирох бүтээгдэхүүн олдсонгүй.
          </Text>
        </View>
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
    alignItems: "center",
    padding: 15,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  activeFilterButton: {
    backgroundColor: "#F2994A",
    borderRadius: 8,
    padding: 5,
  },
  productGrid: {
    padding: 8,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
});

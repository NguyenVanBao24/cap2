import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const FoodCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerCard}>
          <Image style={styles.image} source={require("@/assets/images/food.jpg")} />
          <View style={styles.cardHeader}>
            <View style={styles.contentHeader}>
              <Text style={styles.foodName}>Salad with egg</Text>
              <Text style={styles.foodInfo}>🔥 294 kcal · 100 G</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.nutritionRow}>
            <View style={styles.nutritionItem}>
              <View style={[styles.bar, { width: 7, height: 40, backgroundColor: "#4CAF50" }]} />
              <View>
                <Text style={styles.nutritionValue}>25 g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
            </View>
            <View style={styles.nutritionItem}>
              <View style={[styles.bar, { width: 7, height: 40, backgroundColor: "#FFC107" }]} />
              <View>
                <Text style={styles.nutritionValue}>21 g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
            </View>
            <View style={styles.nutritionItem}>
              <View style={[styles.bar, { width: 7, height: 40, backgroundColor: "#9C27B0" }]} />
              <View>
                <Text style={styles.nutritionValue}>14 g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.grayBackGround,
    gap: 20,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  contentHeader: { flexDirection: "column", justifyContent: "space-around", gap: 5 },
  foodName: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textInput,
  },
  menuButton: {},

  foodInfo: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: "500",
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textInput,
  },
  bar: {
    width: 5,
    borderRadius: 3,
    marginTop: 4,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: "500",
  },
});

export default FoodCard;

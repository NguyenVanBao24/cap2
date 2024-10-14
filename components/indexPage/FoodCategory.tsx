import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

const categories = [
  { name: "Breakfast", icon: require("@/assets/images/breakfast.jpg") },
  { name: "Dinner", icon: require("@/assets/images/dinner.jpg") },
  { name: "Lunch", icon: require("@/assets/images/lunch.jpg") },
  { name: "Vegetable", icon: require("@/assets/images/vegetable.jpg") },
  { name: "Meat", icon: require("@/assets/images/meat.jpg") },
  { name: "Drink", icon: require("@/assets/images/drink.jpg") },
  { name: "Dessert", icon: require("@/assets/images/dessert.jpg") },
];

const FoodCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === category.name && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <View style={styles.imageContainer}>
            <Image source={category.icon} style={styles.image} />
          </View>
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.name && styles.selectedCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 4,
    paddingHorizontal: 5,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    elevation: 5,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    elevation: 5,
  },
  imageContainer: {
    borderRadius: 50,
    backgroundColor: "white",
  },
  image: {
    borderRadius: 60,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  categoryText: {
    color: Colors.textInput,
    fontWeight: "600",
    paddingRight: 8,
  },
  selectedCategoryText: {
    color: "white",
  },
});

export default FoodCategory;

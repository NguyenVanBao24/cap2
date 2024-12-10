import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router, useFocusEffect } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";

type Category = { imageIcon: any; label: string; type: string; image: any };

type FoodCategoryProps = {
  action?: "navigate" | "fetch" | "both";
  selectedCategoryName?: string;
  categories: Category[];
  onSelectCategory?: (categoryName: string, type: string) => void;
};

const FoodCategory: React.FC<FoodCategoryProps> = ({
  action = "navigate",
  selectedCategoryName,
  categories,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryName || "");

  useFocusEffect(
    useCallback(() => {
      // Only reset selectedCategory if it hasn't been set externally (from props)
      if (!selectedCategoryName) {
        setSelectedCategory(""); // Reset the category only if selectedCategoryName is not passed
      }
    }, [selectedCategoryName])
  );

  // Navigate to meal page with the selected category label
  const navigateToMeal = useCallback((label: string, type: string) => {
    setSelectedCategory(label);
    router.push({
      pathname: `/search/meal/${label}`,
      params: { label: label, type: type },
    });
  }, []);

  const handleMeal = (label: string, type: string) => {
    if ((action === "fetch" || action === "both") && onSelectCategory) {
      onSelectCategory(label, type); // Trigger the callback to notify parent
    }

    if (action === "navigate" || action === "both") {
      navigateToMeal(label, type); // Navigate to the respective meal page
    }
  };

  useEffect(() => {
    if (selectedCategoryName) {
      setSelectedCategory(selectedCategoryName); // Set category when `selectedCategoryName` prop changes
    }
  }, [selectedCategoryName]);

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory == item.label && styles.selectedCategory]}
      onPress={() => handleMeal(item.label, item.type)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.imageIcon} style={styles.image} />
      </View>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.label && styles.categoryTextSelected,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    margin: 2,
    paddingHorizontal: Css.paddingHoriAllPageSmall,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginHorizontal: 4,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    elevation: 2,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: Colors.primary_2,
    borderWidth: 1,
    elevation: 2,
  },
  imageContainer: {
    borderRadius: 50,
    backgroundColor: "white",
  },
  image: {
    borderRadius: 10,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  categoryText: {
    color: Colors.textInput,
    fontWeight: "600",
    fontSize: 12,
  },
  categoryTextSelected: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 12,
  },
});

export default FoodCategory;

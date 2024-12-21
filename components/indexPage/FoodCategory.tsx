import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router, useFocusEffect } from "expo-router";
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  selectedCategoryType?: string;
  categories: Category[];
  onSelectCategory?: (categoryName: string, type: string) => void;
};

const FoodCategory: React.FC<FoodCategoryProps> = ({
  action = "navigate",
  selectedCategoryName,
  selectedCategoryType,
  categories,
  onSelectCategory,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      if (!selectedCategoryType) {
        // Reset nếu không có type
      }
    }, [selectedCategoryType])
  );

  const navigateToMeal = useCallback((label: string, type: string) => {
    router.push({
      pathname: `/search/meal/${label}`,
      params: { label, type },
    });
  }, []);

  const handleMeal = (label: string, type: string) => {
    if ((action === "fetch" || action === "both") && onSelectCategory) {
      onSelectCategory(label, type);
    }

    if (action === "navigate" || action === "both") {
      navigateToMeal(label, type);
    }
  };

  useEffect(() => {
    if (selectedCategoryName) {
      const index = categories.findIndex((item) => item.label === selectedCategoryName);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [selectedCategoryName, categories]);

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategoryName === item.label && styles.selectedCategory,
      ]}
      onPress={() => handleMeal(item.label, item.type)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.imageIcon} style={styles.image} />
      </View>
      <Text
        style={[
          styles.categoryText,
          selectedCategoryName === item.label && styles.categoryTextSelected,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        getItemLayout={(data, index) => ({
          length: 100, // Chiều rộng ước tính của mỗi item
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    margin: 2,
    paddingHorizontal: Css.paddingHoriAllPageSmall,
    gap: 4,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginHorizontal: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    width: 30,
    height: 30,
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

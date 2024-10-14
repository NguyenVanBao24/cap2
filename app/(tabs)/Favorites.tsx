import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import PopularCard from "@/components/indexPage/PopularCard";
import FavoriteCard from "@/components/Favorite.tsx/FavoriteCard";
import Header from "@/components/Header";

const Favorites = () => {
  // State for switching between Food and Recipes tab
  const [activeTab, setActiveTab] = useState("Recipes");

  return (
    <View style={styles.container}>
      <Header title="Favorites" />

      <View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "Food" ? styles.activeTab : styles.inactiveTab]}
            onPress={() => setActiveTab("Food")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Food" ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              Food
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "Recipes" ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab("Recipes")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Recipes" ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.contentContainer}>
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
        <FavoriteCard
          imageUrl="https://your-image-url.com/salad.png"
          title="Cavolo Nero Salad"
          description="Cavolo nero & tomato"
          calories={230}
          liked={true}
        />
      </ScrollView>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

// Data for Favorite Items
const favoriteItems = [
  {
    title: "Chopped Spring Ramen",
    subtitle: "Scallions & tomatoes",
    calories: 250,
    image: require("@/assets/images/food.jpg"), // Thay bằng đường dẫn hình ảnh của bạn
  },
  {
    title: "Chicken Tandoori",
    subtitle: "Chicken & Salad",
    calories: 450,
    image: require("@/assets/images/food.jpg"), // Thay bằng đường dẫn hình ảnh của bạn
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 16,
  },
  tabContainer: {
    padding: 6,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  inactiveTab: {
    backgroundColor: Colors.white,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: Colors.primary,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  favoriteCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e9f5ee",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  foodImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  cardTextContent: {
    justifyContent: "center",
  },
  foodCalories: {
    fontSize: 14,
    color: "#6abf69",
    marginBottom: 4,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  foodSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  searchButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 16,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default Favorites;

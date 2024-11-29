import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes, articles, people..."
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Hot Now Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hot Now</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {hotNowItems.map((item, index) => (
            <Card key={index} style={styles.hotCard}>
              <Image source={item.image} style={styles.hotImage} />
              <View style={styles.hotCardContent}>
                <Text style={styles.hotTitle}>{item.title}</Text>
                <Text style={styles.hotSubtitle}>{item.subtitle}</Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Trending Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending</Text>
        {trendingItems.map((item, index) => (
          <View key={index} style={styles.trendingItem}>
            <Text style={styles.trendingText}>{item}</Text>
            <Ionicons name="trending-up" size={16} color="#f28b82" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Data for Hot Now Section
const hotNowItems = [
  {
    title: "The Pumpkins Secrets",
    subtitle: "The Pumpkins Secrets",
    image: require("@/assets/images/food.jpg"),
  },
  {
    title: "Green Secrets",
    subtitle: "The Pumpkins Secrets",
    image: require("@/assets/images/food.jpg"),
  },
];

// Data for Trending Section
const trendingItems = [
  "best vegetable recipes",
  "cool season vegetables",
  "chicken recipes with eggs",
  "soups",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 8,
    marginVertical: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  hotCard: {
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    width: 180,
    backgroundColor: "#ffffff",
  },
  hotImage: {
    width: "100%",
    height: 100,
  },
  hotCardContent: {
    padding: 12,
  },
  hotTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hotSubtitle: {
    fontSize: 12,
    color: "#888",
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  trendingText: {
    fontSize: 16,
    color: "#f28b82",
  },
});

export default App;

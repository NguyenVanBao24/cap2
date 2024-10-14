// HealthyCard.tsx

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface HealthyCardProps {
  name: string;
  rating: number;
  deliveryTime: string;
  categories: string[];
  imageUri: string;
}

const Tag = styled.Text`
  background-color: #f6f6f6;
  padding: 6px 10px;
  border-radius: 12px;
  margin-right: 4px;
  font-size: 12px;
  color: "#8A8E9B";
`;

// Component chính
const HealthyCard: React.FC<HealthyCardProps> = ({
  name,
  rating,
  deliveryTime,
  categories,
  imageUri,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating} </Text>
        <FontAwesome name="star" size={16} color="gold" />
        <Text style={styles.reviewCount}>(25+)</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{name}</Text>
          <MaterialIcons name="verified" size={16} color="deepskyblue" />
        </View>
        <View style={styles.deliveryInfo}>
          <View style={styles.delivery}>
            <MaterialIcons name="delivery-dining" size={16} color={Colors.primary} />
            <Text style={styles.deliveryText}> Free delivery </Text>
          </View>
          <View style={styles.time}>
            <MaterialIcons name="access-time" size={16} color={Colors.primary} />
            <Text style={styles.timeText}>{deliveryTime}</Text>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Tag key={index}>{category}</Tag>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteIcon}>
        <FontAwesome name="heart" size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginVertical: 14,
  },
  image: {
    width: "100%",
    height: 136,
  },
  ratingContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 20,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "bold",
  },
  reviewCount: {
    marginHorizontal: 4,
    fontSize: 12,
    color: "#888",
  },
  contentContainer: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deliveryInfo: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  delivery: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryText: {
    color: "#7E8392",
    fontSize: 14,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  timeText: {
    color: "#7E8392",
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  favoriteIcon: {
    padding: 6,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: Colors.primary,
    top: 10,
    right: 10,
  },
});

export default HealthyCard;

import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PopularCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.paZokRr6HFdXZQoIAKmDjgHaEK?rs=1&pid=ImgDetMain",
          }}
          style={styles.foodImage}
        />

        <TouchableOpacity style={styles.favoriteButton}>
          <MaterialIcons name="favorite-border" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.foodName}>Salmon Salad</Text>
        <Text style={styles.foodDescription}>Baked salmon fish</Text>

        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>4.5 (25+)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    minWidth: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 14,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  foodImage: {
    width: "100%",
    height: "100%",
  },
  priceContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  priceText: {
    color: "#ff4b4b",
    fontWeight: "bold",
    fontSize: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 4,
  },
  infoContainer: {
    padding: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  foodDescription: {
    color: "#7c7c7c",
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: "#333",
    fontSize: 14,
    marginLeft: 4,
  },
});

export default PopularCard;

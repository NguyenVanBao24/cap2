import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router } from "expo-router";

interface PopularCardProps {
  id: string;
  name: string;
  deliveryTime?: any;
  categories: string[];
  imageUri: string;
  unit: string;
  description: string;
  numberElement?: number; // Change to number type
}

const PopularCard: React.FC<PopularCardProps> = ({
  id,
  name,
  deliveryTime,
  categories,
  imageUri,
  unit,
  description,
  numberElement = 1.1, // Default to 1 element per row if not provided
}) => {
  const handleRecipes = () => {
    router.push(`/search/food/${id}`);
  };

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / numberElement;

  return (
    <TouchableOpacity onPress={handleRecipes} style={[styles.cardContainer, { width: cardWidth }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.foodImage}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.foodName}>{`${categories[0]}   . `} 10ph</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
  },
  foodImage: {
    width: "100%",
    height: "100%",
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
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  foodName: {
    fontSize: Css.fontTextLower,
    fontWeight: "500",
    color: Colors.textInput,
  },
  foodDescription: {
    color: "#888",
    fontSize: Css.fontTextLower,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingText: {
    fontSize: Css.fontTextLowest,
    fontWeight: "bold",
  },
  numRatingText: {
    fontSize: Css.fontTextLowest,
    color: "#888",
  },
});

export default PopularCard;

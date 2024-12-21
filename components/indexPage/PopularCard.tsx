import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router } from "expo-router";
const screenWidth = Dimensions.get("window").width;

interface PopularCardProps {
  id: string;
  name?: string;
  deliveryTime?: any;
  calories?: string;
  imageUri?: string;
  unit?: string;
  description?: string;
  numberElement?: number;
  quantity?: number;
  direction?: boolean;
}

const PopularCard: React.FC<PopularCardProps> = ({
  id,
  name,
  deliveryTime,
  calories,
  imageUri,
  unit,
  quantity = 100,
  numberElement = 1.1,
  direction = true,
}) => {
  const handleRecipes = () => {
    router.push(`/search/food/${id}`);
  };

  const cardWidth = screenWidth / numberElement;

  return direction ? (
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
          <Text style={styles.timeText}>{`${calories} calories/ ${quantity} ${unit}`}</Text>
          {calories && <Text style={styles.timeText}>{calories[0]} </Text>}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={handleRecipes} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainerFlase}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.foodImageFalse}
          />
          <Text style={styles.foodName}>{name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.timeText}>{`${calories} calories`}</Text>
          <Text style={styles.timeText}>{`${quantity} ${unit}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - Css.paddingHoriAllPage * 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainerFlase: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  foodImageFalse: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
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
    borderRadius: Css.borderRadius,
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
    fontSize: Css.fontTextLow,
    fontWeight: "600",
  },
  timeText: {
    color: "#888",
    fontWeight: "500",
    fontSize: Css.fontTextLower,
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

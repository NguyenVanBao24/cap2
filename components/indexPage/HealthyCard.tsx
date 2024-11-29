import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Css } from "@/constants/Css";
import { deleteFavoriteUserId, postFavoriteUserId } from "@/services/favorite";
import { getuserID } from "@/store/tokenHelper";

interface HealthyCardProps {
  id: string;
  name: string;
  deliveryTime: string;
  categories: string[];
  imageUri: string;
  numberElement?: number;
}

const categoryColors = [Colors.primary, Colors.protein, Colors.crabs, Colors.fat];
const screenWidth = Dimensions.get("window").width;
const cardHeight = (screenWidth * 1) / 2;

const HealthyCard: React.FC<HealthyCardProps> = ({
  id,
  name,
  deliveryTime,
  categories,
  imageUri,
  numberElement = 1.1,
}) => {
  const handleItemNavigate = () => {
    router.push(`/search/ingredient/${id}`);
  };
  const userID = getuserID();
  const cardWidth = (screenWidth - Css.paddingHoriAllPage * 2) / numberElement;
  const [isFavo, setIsFavo] = useState(true);
  const handleFavorite = () => {
    setIsFavo(!isFavo);
    postFavoriteUserId(userID, id);
  };
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { width: cardWidth }]}
      onPress={handleItemNavigate}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{name}</Text>
          <View style={styles.time}>
            <MaterialIcons name="access-time" size={16} color={Colors.primary} />
            <Text style={styles.timeText}>{deliveryTime}</Text>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <View key={index} style={styles.tag}>
              <Text
                style={[styles.tagText, { color: categoryColors[index % categoryColors.length] }]}
              >
                {category}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <Ionicons name={!isFavo ? "heart" : "heart-outline"} size={24} color={Colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Css.borderRadius,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingBottom: 4,
  },
  image: {
    width: "100%",
    height: cardHeight,
    resizeMode: "stretch",
  },
  contentContainer: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: Css.fontTextLow,
    fontWeight: "400",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#888",
    fontSize: Css.fontTextLower,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    justifyContent: "space-around",
  },
  favoriteIcon: {
    padding: 6,
    position: "absolute",
    top: 10,
    right: 10,
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: Colors.grayBackGround,
  },
  tagText: {
    fontSize: Css.fontTextLower,
    color: "#8A8E9B",
    padding: 6,
  },
});

export default HealthyCard;

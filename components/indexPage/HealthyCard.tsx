import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Css } from "@/constants/Css";
import { deleteFavoriteUserId, postFavoriteUserId } from "@/services/favorite";
import { getuserID } from "@/store/tokenHelper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
        </View>
        <View style={styles.categoriesContainer}>
          <View style={styles.time}>
            <MaterialIcons name="access-time" size={16} color={Colors.primary} />
            <Text style={styles.timeText}>{deliveryTime} | </Text>
          </View>
          <Text style={styles.timeText}>{categories[0]}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <FontAwesome5 name="star" size={16} color={!isFavo ? Colors.black : Colors.white} />
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
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  restaurantName: {
    fontSize: Css.fontTextLow,
    fontWeight: "600",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#888",
    fontWeight: "500",
    fontSize: Css.fontTextLower,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  favoriteIcon: {
    backgroundColor: "#ddd",
    borderRadius: "50%",
    padding: 6,
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default HealthyCard;

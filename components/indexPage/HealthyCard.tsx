import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Css, isFavorite } from "@/constants/Css";
import { deleteFavoriteUserId, postFavoriteUserId } from "@/services/favorite";
import { getuserID } from "@/store/tokenHelper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useFavoriteStore } from "@/store/favorite";
import { Chip } from "react-native-paper";

interface HealthyCardProps {
  idRecipe: string;
  name: string;
  deliveryTime: string;
  categories: string[];
  imageUri: string;
  numberElement?: number;
  cookTime?: string | number;
  isNutrionPlanTbas?: boolean;
  kcal?: string;
  fat?: string;
  protein?: string;
  carbs?: string;
}

const categoryColors = [Colors.primary, Colors.protein, Colors.crabs, Colors.fat];
const screenWidth = Dimensions.get("window").width;
const cardHeight = (screenWidth * 1) / 2;

const HealthyCard: React.FC<HealthyCardProps> = ({
  idRecipe,
  name,
  deliveryTime,
  categories,
  imageUri,
  numberElement = 1.1,
  cookTime,
  isNutrionPlanTbas = false,
  kcal,
  fat,
  protein,
  carbs,
}) => {
  const handleItemNavigate = () => {
    router.push(`/search/ingredient/${idRecipe}`);
  };
  const userID = getuserID();
  const cardWidth = (screenWidth - Css.paddingHoriAllPage * 2) / numberElement;
  const { allUserFavorite, deleteFavorite, postFavorite } = useFavoriteStore();

  const favoriteItem = allUserFavorite?.find((item) => item.recipeID === idRecipe);
  const [favoriteState, setFavoriteState] = useState({
    isFavo: !!favoriteItem,
    favoriteID: favoriteItem?.favoriteID || null,
  });

  const handleFavorite = async () => {
    setFavoriteState((prevState) => ({
      ...prevState,
      isFavo: !prevState.isFavo,
    }));
    try {
      if (favoriteState.isFavo) {
        await deleteFavorite(userID, favoriteState.favoriteID);
      } else {
        await postFavorite(userID, idRecipe);
        console.log("first");
      }
    } catch (error) {
      console.log("Failer at hEALTHCARD", error);
    }
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
        {!isNutrionPlanTbas ? (
          <View style={styles.categoriesContainer}>
            <View style={styles.time}>
              <Text style={styles.timeText}>{`${cookTime || deliveryTime}`} mins | </Text>
            </View>
            <Text style={styles.timeText}>{categories[0]}</Text>
          </View>
        ) : (
          <View style={styles.categoriesContainer}>
            <View style={styles.timeTrue}>
              <Chip style={styles.chip} onPress={() => console.log("Pressed")}>
                {kcal} Calories
              </Chip>
              <Chip style={styles.chip} onPress={() => console.log("Pressed")}>
                {protein} Protein
              </Chip>
              <Chip style={styles.chip} onPress={() => console.log("Pressed")}>
                {fat} Fat
              </Chip>
              <Chip style={styles.chip} onPress={() => console.log("Pressed")}>
                {carbs} Carb
              </Chip>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <FontAwesome5 name="star" size={16} color={favoriteState.isFavo ? "red" : Colors.white} />
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
  },
  image: {
    width: "100%",
    height: cardHeight,
    resizeMode: "cover",
    borderRadius: Css.borderRadius,
  },
  contentContainer: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantName: {
    fontSize: Css.fontTextLow,
    fontWeight: "600",
  },
  time: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    width: "100%",
  },
  timeTrue: {
    flexDirection: "row", // Sắp xếp các phần tử theo hàng ngang
    flexWrap: "wrap", // Cho phép xuống dòng nếu không đủ chỗ
    justifyContent: "space-between", // Căn chỉnh khoảng cách giữa các phần tử
    flex: 1,
    gap: 2,
  },
  chip: {
    flex: 1,
    minWidth: "45%", // Đảm bảo mỗi `Chip` chiếm khoảng một nửa chiều ngang
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

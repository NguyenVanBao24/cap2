import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { deleteTrackingByID } from "@/services/tracking";

interface FoodCardProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  date: string;
  recipeName: string;
  imageURL: string;
  recipeID: string;
  nutritionId: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  recipeName,
  calories,
  protein,
  fat,
  carbs,
  date,
  imageURL,
  recipeID,
  nutritionId,
}) => {
  const handleRecipe = () => {
    router.push(`/search/ingredient/${recipeID}`);
  };

  const handleRemoveRecipe = async (nutritionId: string) => {
    try {
      const response = await deleteTrackingByID(nutritionId);
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.headerCard} onPress={handleRecipe}>
          <Image style={styles.image} source={{ uri: imageURL }} />
          <View style={styles.cardHeader}>
            <View style={styles.contentHeader}>
              <Text style={styles.foodName}>{recipeName}</Text>
              <Text style={styles.foodInfo}>🔥 {calories} kcal</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleRemoveRecipe(nutritionId)}>
          <FontAwesome name="remove" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.grayBackGround,
    flexDirection: "row",
    alignItems: "center",
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  contentHeader: { flexDirection: "column", justifyContent: "space-around", gap: 5 },
  foodName: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textInput,
  },
  menuButton: { padding: 20 },
  foodInfo: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: "500",
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  nutritionItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textInput,
  },
  bar: {
    width: 5,
    height: 40,
    borderRadius: 3,
    marginTop: 4,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 14,
    color: Colors.gray,
  },
});

export default FoodCard;

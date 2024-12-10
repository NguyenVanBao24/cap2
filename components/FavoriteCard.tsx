// CavoloNeroSalad.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { getRecipesServiceById } from "@/services/recipeService";
import { deleteFavoriteUserId, postFavoriteUserId } from "@/services/favorite";
import { getuserID } from "@/store/tokenHelper";

interface CavoloNeroSaladProps {
  item: FavoriteRecipe;
}

const CavoloNeroSalad: React.FC<CavoloNeroSaladProps> = ({ item }) => {
  const [results, setResults] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavo, setIsFavo] = useState(true);
  const userID = getuserID();
  useEffect(() => {
    const favoriteApi = async () => {
      setIsLoading(true);
      try {
        const response = await getRecipesServiceById(item.recipeID);
        setResults(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (item) {
      favoriteApi();
    }
  }, [item]);

  const apiFavorite = async () => {
    await deleteFavoriteUserId(item.favoriteID);
  };
  const handleFavorite = () => {
    setIsFavo(!isFavo);
    apiFavorite();
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: results?.imageURL,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{results?.recipeName}</Text>
        <Text style={styles.calories}>
          {results?.totalCalories} Kcal |
          <Text style={styles.calories}>{results?.prepTime} min</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={handleFavorite}>
        <AntDesign name={isFavo ? "star" : "staro"} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  calories: {
    fontSize: 12,
    fontWeight: "400",
  },
  icon: {
    marginLeft: 10,
  },
});

export default CavoloNeroSalad;

// CavoloNeroSalad.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { getRecipesServiceById } from "@/services/recipeService";
import { deleteFavoriteUserId, getFavoriteUserId, postFavoriteUserId } from "@/services/favorite";
import { getuserID } from "@/store/tokenHelper";
import { router } from "expo-router";
import { useFavoriteStore } from "@/store/favorite";

interface CavoloNeroSaladProps {
  item: FavoriteRecipe;
  iconFavorite?: boolean;
}

const CavoloNeroSalad: React.FC<CavoloNeroSaladProps> = ({ item, iconFavorite = true }) => {
  const [results, setResults] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavo, setIsFavo] = useState(true);
  const userID = getuserID();
  useEffect(() => {
    const favoriteApi = async () => {
      setIsLoading(true);
      try {
        let response = [];
        iconFavorite
          ? (response = await getRecipesServiceById(item.recipeID))
          : (response = await getFavoriteUserId(item.recipeID));

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
  const { deleteFavorite } = useFavoriteStore();
  const apiFavorite = async () => {
    try {
      await deleteFavorite(userID, item.favoriteID);
    } catch (error) {
      console.log("Error deleting favorite:", error);
    }
  };
  const handleFavorite = () => {
    setIsFavo(!isFavo);
    apiFavorite();
  };

  const handleRecipe = (id: string) => {
    router.push(`/search/ingredient/${id}`);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => handleRecipe(iconFavorite ? results?.recipe_ID : item?.recipe_ID)}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: iconFavorite ? results?.imageURL : item?.imageURL,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{iconFavorite ? results?.recipeName : item?.recipeName}</Text>
          <Text style={styles.calories}>
            {iconFavorite ? results?.totalCalories : item?.calories} Kcal |
            <Text style={styles.calories}>
              {iconFavorite ? results?.prepTime : item?.prepTime} min
            </Text>
          </Text>
        </View>
        {iconFavorite && (
          <TouchableOpacity onPress={handleFavorite}>
            <AntDesign name={isFavo ? "star" : "staro"} size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
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
function deleteFavorite(favoriteID: string) {
  throw new Error("Function not implemented.");
}

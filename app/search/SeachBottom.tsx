import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { useFocusEffect } from "@react-navigation/native";
import { getSearchIngredientService } from "@/services/ingredientService";
import { getRecipesServiceById } from "@/services/recipeService";
import HealthyCard from "@/components/indexPage/HealthyCard";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFavoriteTrending } from "@/services/favorite";

const SearchBottomSheet = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [trendingRecipe, setTrendingRecipe] = useState();
  useFocusEffect(
    useCallback(() => {
      inputRef.current?.focus();
      return () => Keyboard.dismiss();
    }, [])
  );
  const queryNo = 1;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const trendingResponse = await getFavoriteTrending();
        setTrendingRecipe(trendingResponse);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const searchApi = async (searchQuery: string) => {
    setIsLoading(true);
    const ingredients = [searchQuery];

    try {
      const response = await getSearchIngredientService(ingredients, queryNo);
      setResults(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      searchApi(text);
    } else {
      setResults([]);
      setRecipes([]);
    }
  };

  const handleTrendingClick = (item: string) => {
    setQuery(item);
    searchApi(item);
  };

  const handleCallRecipe = async (recipeName: string, recipe_ID: string) => {
    setQuery(recipeName);
    setResults([]);
    try {
      const response = await getRecipesServiceById(recipe_ID);
      setRecipes(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    setQuery("");
    setResults([]);
    setRecipes([]);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" style={{ paddingHorizontal: 10 }} size={24} />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Find for nutrition..."
            placeholderTextColor="#8e8e93"
            value={query}
            onChangeText={handleInputChange}
            onSubmitEditing={() =>
              results.length > 0 && handleCallRecipe(query, results[0].recipe_ID)
            }
          />
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="close" size={20} color={Colors.black} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {results.length > 0 && query != "" ? (
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              data={results}
              keyExtractor={(item) => item.recipe_ID}
              renderItem={({ item }) => (
                <HealthyCard
                  numberElement={1}
                  name={item.recipeName}
                  deliveryTime="15-20"
                  cookTime={item?.cookTime}
                  categories={[
                    `${item.totalCalories} Kcal`,
                    `${item.totalProtein} Protein`,
                    `${item.totalCarbs} Carbs`,
                    `${item.totalFat} Fats`,
                  ]}
                  imageUri={item.imageURL}
                  idRecipe={item.recipe_ID}
                />
              )}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Trending Food</Text>
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                data={trendingRecipe}
                keyExtractor={(item) => item.recipe_ID}
                renderItem={({ item }) => (
                  <HealthyCard
                    numberElement={1}
                    name={item.recipeName}
                    deliveryTime="15-20 mins"
                    categories={[
                      `${item.totalCalories} Kcal`,
                      `${item.totalProtein} Protein`,
                      `${item.totalCarbs} Carbs`,
                      `${item.totalFat} Fats`,
                    ]}
                    imageUri={item.imageURL}
                    idRecipe={item.recipe_ID}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: Css.paddingHoriAllPage,
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: Css.fontTextLow,
    padding: 10,
    backgroundColor: Colors.white,
    fontWeight: "500",
  },
  listContainer: {
    flexGrow: 1, // Ensure FlatList stretches fully
    width: "100%", // Full width
    alignItems: "center", // Center if necessary
    paddingHorizontal: 0, // Remove unnecessary padding
    marginTop: 12,
    gap: 10,
  },
});

export default SearchBottomSheet;

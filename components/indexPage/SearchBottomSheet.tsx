import React, { useState, useEffect, useRef, useCallback } from "react";
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
import PopularCard from "./PopularCard";
import HealthyCard from "./HealthyCard";

const SearchBottomSheet = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus the input field when the modal opens
  useFocusEffect(
    useCallback(() => {
      inputRef.current?.focus();
      return () => Keyboard.dismiss();
    }, [])
  );

  const searchApi = async (searchQuery: string) => {
    setIsLoading(true);
    const ingredients = [searchQuery];

    try {
      const response = await getSearchIngredientService(ingredients);
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
  const handleBack = () => {};

  return (
    <View style={styles.container}>
      {/* Search Bar */}
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

      {/* Conditionally render either recipes or results */}
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
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
              id={item.recipe_ID}
            />
          )}
        />
      ) : results.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={results}
          keyExtractor={(item) => item.recipeName}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleCallRecipe(item.recipeName, item.recipe_ID)}
            >
              <Text style={styles.resultText}>{item.recipeName}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <>
              <Text>them naviga</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: Css.paddingHoriAllPage,
    paddingTop: 16,
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
  loadingText: {
    textAlign: "center",
    color: Colors.gray,
    marginVertical: 10,
  },
  listContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  trendingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  trendingText: {
    fontSize: 16,
    color: "#fb6d6c",
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBackGround,
  },
  resultText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default SearchBottomSheet;

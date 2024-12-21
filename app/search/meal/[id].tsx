// @ts-nocheck

import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FoodCategory from "@/components/indexPage/FoodCategory";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import {
  getRecipesByHard,
  getRecipesByKcalService,
  getRecipesFilterService,
} from "@/services/recipeService";
import HealthyCard from "@/components/indexPage/HealthyCard";
import { Ionicons } from "@expo/vector-icons";
import { calorieData, hard, meal } from "@/constants/data";
import HeaderElement from "@/components/indexPage/HeaderElement";
import { G } from "react-native-svg";

const AllMeal = () => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [recipeData, setRecipeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { label, type } = useLocalSearchParams();
  const [useLocalSearch, setUseLocalSearch] = useState({ label, type });

  useEffect(() => {
    if (useLocalSearch.label) fetchMealData(useLocalSearch.label, useLocalSearch.type);
  }, [useLocalSearch.label, useLocalSearch.type]);

  const categories =
    useLocalSearch.type == "meal"
      ? [...meal, ...calorieData, ...hard]
      : useLocalSearch.type == "Kcal"
      ? [...calorieData, ...meal, ...hard]
      : [...hard, ...calorieData, ...meal];

  const fetchMealData = async (label: string, type: string) => {
    setLoading(true);
    try {
      let response;
      if (type == "meal") {
        response = await getRecipesFilterService(label, -1);
      } else if (type == "Kcal") {
        if (label == "700+") {
          response = await getRecipesByKcalService(700, 1000, 1);
        } else {
          const [minMacro, maxMacro] = label.split("-")?.map(Number);
          response = await getRecipesByKcalService(minMacro, maxMacro, 1);
        }
      } else if (type == "hard") {
        response = await getRecipesByHard(label.toUpperCase(), -1);
      } else {
        throw new Error("Invalid type provided");
      }
      setRecipeData(response.data);
    } catch (error) {
      console.log("Error fetching meal data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelection = (categoryName: string, type: string) => {
    fetchMealData(categoryName, type);
    setUseLocalSearch({ label: categoryName, type: type });
  };

  const recommendedRecipe = recipeData[0];
  recipeData?.map((recipe) => {
    if (
      recipe.nutritionalQuality[0] == "LOW_PROTEIN" ||
      recipe.nutritionalQuality[1] == "LOW_PROTEIN" ||
      recipe.nutritionalQuality[2] == "LOW_PROTEIN"
    ) {
    }
  });
  const renderFilterList = (filterName: string) => {
    const filteredData = recipeData?.filter((recipe) => {
      switch (filterName) {
        case "Breakfast":
          return (
            recipe.mealType[0] == "BREAKFAST" ||
            recipe.mealType[1] == "BREAKFAST" ||
            recipe.mealType[2] == "BREAKFAST"
          );
        case "Lunch":
          return (
            recipe.mealType[0] == "LUNCH" ||
            recipe.mealType[1] == "LUNCH" ||
            recipe.mealType[2] == "LUNCH"
          );
        case "Dinner":
          return (
            recipe.mealType[0] == "DINNER" ||
            recipe.mealType[1] == "DINNER" ||
            recipe.mealType[2] == "DINNER"
          );
        case "Low Protein":
          return (
            recipe.nutritionalQuality[0] == "LOW_PROTEIN" ||
            recipe.nutritionalQuality[1] == "LOW_PROTEIN" ||
            recipe.nutritionalQuality[2] == "LOW_PROTEIN"
          );
        case "High Protein":
          return (
            recipe.nutritionalQuality[0] == "HIGH_PROTEIN" ||
            recipe.nutritionalQuality[1] == "HIGH_PROTEIN" ||
            recipe.nutritionalQuality[2] == "HIGH_PROTEIN"
          );
        case "Easy to make":
          return recipe.difficultyLevel == "EASY";
        case "Medium to make":
          return recipe.difficultyLevel == "MEDIUM";
        case "Hard to make":
          return recipe.difficultyLevel == "HARD";
        default:
          return true;
      }
    });

    return (
      <View style={styles.filterContainer}>
        <HeaderElement header={filterName} />

        <FlatList
          data={filteredData}
          horizontal
          keyExtractor={(item, index) => `${item.recipe_ID}_${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <HealthyCard
              name={item.recipeName}
              deliveryTime="15-20 mins"
              cookTime={item.cookTime}
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
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ height: 43, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={handleBack}
            style={{
              position: "absolute",
              zIndex: 1,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back" style={{ paddingHorizontal: 20 }} size={24} />
            <View>
              <HeaderElement header={useLocalSearch.label.toString()} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <FoodCategory
            action="fetch"
            selectedCategoryName={useLocalSearch.label}
            selectedCategoryType={useLocalSearch.type}
            categories={categories}
            onSelectCategory={handleCategorySelection}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
        ) : recipeData.length > 0 ? (
          <ScrollView>
            {recommendedRecipe && (
              <View style={styles.recommendedContainer}>
                <HeaderElement header={"Recommended Food Today"} />

                <HealthyCard
                  numberElement={1}
                  name={recommendedRecipe.recipeName}
                  cookTime={recommendedRecipe.cookTime}
                  deliveryTime="15-20 mins"
                  categories={[
                    `${recommendedRecipe.totalCalories} Kcal`,
                    `${recommendedRecipe.totalProtein} Protein`,
                    `${recommendedRecipe.totalCarbs} Carbs`,
                    `${recommendedRecipe.totalFat} Fats`,
                  ]}
                  imageUri={recommendedRecipe.imageURL}
                  idRecipe={recommendedRecipe.recipe_ID}
                />
              </View>
            )}

            <View style={styles.filtersContainer}>
              {useLocalSearch.type === "meal" &&
                [
                  "Low Protein",
                  "High Protein",
                  "Easy to make",
                  "Medium to make",
                  "Hard to make",
                ].map((filterName, index) => (
                  <React.Fragment key={`meal-${index}`}>
                    {renderFilterList(filterName)}
                  </React.Fragment>
                ))}
              {useLocalSearch.type === "Kcal" &&
                [
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Low Protein",
                  "High Protein",
                  "Easy to make",
                  "Medium to make",
                  "Hard to make",
                ].map((filterName, index) => (
                  <React.Fragment key={`kcal-${index}`}>
                    {renderFilterList(filterName)}
                  </React.Fragment>
                ))}
              {useLocalSearch.type === "hard" &&
                ["Breakfast", "Dinner", "Lunch", "Low Protein", "High Protein"].map(
                  (filterName, index) => (
                    <React.Fragment key={`hard-${index}`}>
                      {renderFilterList(filterName)}
                    </React.Fragment>
                  )
                )}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              width: screenWidth,
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              No products available for {useLocalSearch.label}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 84,
  },
  recommendedContainer: {
    paddingHorizontal: 10,
  },
  recommendedText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.textInput,
  },
  filtersContainer: {},
  filterContainer: {},
  filterTitle: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.textInput,
  },
  horizontalList: {
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 10,
  },
});

export default AllMeal;

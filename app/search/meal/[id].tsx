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
import React, { useEffect, useState } from "react";
import FoodCategory from "@/components/indexPage/FoodCategory";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { getRecipesByKcalService, getRecipesFilterService } from "@/services/recipeService";
import HealthyCard from "@/components/indexPage/HealthyCard";
import { Ionicons } from "@expo/vector-icons";
import { calorieData, meal } from "@/constants/data";

const categories = [...meal, ...calorieData];
const AllMeal = () => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeOfMeal, setTypeOfMeal] = useState("");
  const { label, type } = useLocalSearchParams();

  const [useLocalSearch, setUseLocalSearch] = useState({ label, type });

  useEffect(() => {
    if (useLocalSearch.label) fetchMealData(useLocalSearch.label, useLocalSearch.type);
  }, [useLocalSearch.label, useLocalSearch.type]);

  const fetchMealData = async (label: any, type: any) => {
    setLoading(true); // Hiển thị trạng thái đang tải
    try {
      let response;

      if (type == "meal") {
        response = await getRecipesFilterService(label);
      } else if (type == "Kcal") {
        const [minMacro, maxMacro] = label.split("-")?.map(Number);
        response = await getRecipesByKcalService(minMacro, maxMacro);
      } else {
        throw new Error("Invalid type provided"); // Xử lý lỗi nếu type không hợp lệ
      }

      setRecipeData(response.data); // Cập nhật dữ liệu vào state
    } catch (error) {
      console.error("Error fetching meal data:", error);
    } finally {
      setLoading(false); // Ẩn trạng thái đang tải
    }
  };

  const handleCategorySelection = (categoryName: string, type: string) => {
    setTypeOfMeal(type);
    fetchMealData(categoryName, type);
    setUseLocalSearch({ label: categoryName, type: type });
  };

  const recommendedRecipe = recipeData[0];

  const renderFilterList = (filterName: string) => {
    const filteredDataByMeal = recipeData.filter((recipe) => {
      switch (filterName) {
        case "LOW_PROTEIN":
          return recipe.nutritionalQuality == "LOW_PROTEIN";
        case "HIGHT_PROTEIN":
          return recipe.nutritionalQuality == "HIGHT_PROTEIN";
        case "EASY":
          return recipe.difficultyLevel == "EASY";
        case "MEDIUM":
          return recipe.difficultyLevel == "MEDIUM";
        case "HARD":
          return recipe.difficultyLevel == "HARD";
        default:
          return true;
      }
    });

    const filteredDataByKcal = recipeData.filter((recipe) => {
      switch (filterName) {
        case "BREAKFAST":
          return recipe.difficultyLevel == "BREAKFAST";
        case "DINNER":
          return recipe.difficultyLevel == "DINNER";
        case "LUNCH":
          return recipe.difficultyLevel == "LUNCH";
        case "EASY":
          return recipe.difficultyLevel == "EASY";
        case "MEDIUM":
          return recipe.difficultyLevel == "MEDIUM";
        case "HARD":
          return recipe.difficultyLevel == "HARD";
        default:
          return true;
      }
    });

    const filteredDataByHard = recipeData.filter((recipe) => {
      switch (filterName) {
        case "BREAKFAST":
          return recipe.difficultyLevel == "BREAKFAST";
        case "DINNER":
          return recipe.difficultyLevel == "DINNER";
        case "LUNCH":
          return recipe.difficultyLevel == "LUNCH";
        case "LOW_PROTEIN":
          return recipe.nutritionalQuality == "LOW_PROTEIN";
        case "HIGHT_PROTEIN":
          return recipe.nutritionalQuality == "HIGHT_PROTEIN";
        default:
          return true;
      }
    });

    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>{filterName}</Text>
        <FlatList
          data={
            useLocalSearch.type == "meal"
              ? filteredDataByMeal
              : useLocalSearch.type == "Kcal"
              ? filteredDataByKcal
              : filteredDataByHard
          }
          horizontal
          keyExtractor={(item) => item.recipe_ID}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <HealthyCard
              name={item.recipeName}
              deliveryTime="15-20 mins"
              categories={[
                `${item.totalCalories} Kcal`,
                `${item.totalProtein} Protien`,
                `${item.totalCarbs} Crabs`,
                `${item.totalFat} Fats`,
              ]}
              imageUri={item.imageURL}
              id={item.recipe_ID}
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
        <View style={{ height: 40, backgroundColor: Colors.white }}>
          <TouchableOpacity
            onPress={handleBack}
            style={{
              position: "absolute",
              zIndex: 1,
              width: screenWidth,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back" style={{ paddingHorizontal: 20 }} size={24} />
            <Text style={{ fontSize: 20 }}>{useLocalSearch.label}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <FoodCategory
            action="fetch"
            selectedCategoryName={useLocalSearch.label}
            categories={categories}
            onSelectCategory={handleCategorySelection}
          />
        </View>
        {loading ? ( // Conditionally render ActivityIndicator when loading is true
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
        ) : recipeData.length > 0 ? (
          <ScrollView>
            {recommendedRecipe && (
              <View style={styles.recommendedContainer}>
                <Text style={styles.recommendedText}>Recommended Food Today</Text>
                <HealthyCard
                  numberElement={1}
                  name={recommendedRecipe.recipeName}
                  deliveryTime="15-20 mins"
                  categories={[
                    `${recommendedRecipe.totalCalories} Kcal`,
                    `${recommendedRecipe.totalProtein} Protien`,
                    `${recommendedRecipe.totalCarbs} Crabs`,
                    `${recommendedRecipe.totalFat} Fats`,
                  ]}
                  imageUri={recommendedRecipe.imageURL}
                  id={recommendedRecipe.recipe_ID}
                />
              </View>
            )}

            <View style={styles.filtersContainer}>
              {useLocalSearch.type == "meal"
                ? [
                    "Low Proteint",
                    "Hight Proteint",
                    "Easy to make",
                    "Medium to make",
                    "Hard to make",
                  ].map((filterName) => renderFilterList(filterName))
                : useLocalSearch.type == "Kcal"
                ? [
                    "Breakfast",
                    "Dinner",
                    "Lunch",
                    "Low Proteint",
                    "Hight Proteint",
                    "Easy to make",
                    "Medium to make",
                    "Hard to make",
                  ].map((filterName) => renderFilterList(filterName))
                : [
                    "Breakfast",
                    "Dinner",
                    "Lunch",
                    "Easy to make",
                    "Medium to make",
                    "Hard to make",
                  ].map((filterName) => renderFilterList(filterName))}
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
    height: 80,
  },
  recommendedContainer: {
    paddingHorizontal: 15,
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

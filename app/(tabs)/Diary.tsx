// @ts-nocheck
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlanChoose from "@/components/PlanChoose";
import { getNutritionPlanByNutritionName, getRecipeCalculation } from "@/services/chose";
import { useUserData } from "@/store/userStore";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import { getuserID } from "@/store/tokenHelper";
import { Css } from "@/constants/Css";
import HealthyCard from "@/components/indexPage/HealthyCard";
import { router } from "expo-router";
import HeaderElement from "@/components/indexPage/HeaderElement";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Diary = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nutritionPlanByNutritionName, setNutritionPlanByNutritionName] = useState(null);
  const [recipeByRecipeCalculation, setRecipeByRecipeCalculation] = useState();
  const { nutritionPlan } = useUserData();

  const userId = getuserID();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responerRecipeByNutritionPlanByNutritionName = await getNutritionPlanByNutritionName(
          nutritionPlan
        );
        if (
          responerRecipeByNutritionPlanByNutritionName?.message ==
          "All nutrition plan retrieved successfully"
        ) {
          setNutritionPlanByNutritionName(responerRecipeByNutritionPlanByNutritionName.data);
        }

        const responerRecipeByRecipeCalculation = await getRecipeCalculation(userId);
        setRecipeByRecipeCalculation(responerRecipeByRecipeCalculation.data.meals);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nutritionPlan, userId]);

  if (loading) {
    return <Loading backgroundColor={Colors.primary} />;
  }

  const handleNavigateEdit = () => {
    const isFull = 1;

    router.push({
      pathname: "/(onboarding)/name",
    });
  };

  const handleNavigatePlanNutrition = () => {
    router.push("/(onboarding)/name");
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.headerHome}>Nutrition Plan</Text>
        </View>
        <View style={styles.contentScroll}>
          <TouchableOpacity onPress={() => handleNavigateEdit()}>
            <PlanChoose
              fullScreen={false}
              nutritionPlanName={nutritionPlanByNutritionName?.nutritionPlanName || "Set your goal"}
              proteinPercentage={nutritionPlanByNutritionName?.proteinPercentage || "0"}
              fatPercentage={nutritionPlanByNutritionName?.fatPercentage || "0"}
              carbsPercentage={nutritionPlanByNutritionName?.carbsPercentage || "0"}
              imageURL={nutritionPlanByNutritionName?.imageURL || ""}
            />
          </TouchableOpacity>
          <ScrollView>
            {recipeByRecipeCalculation?.map((meal: any, index: number) => (
              <View key={index} style={styles.mealSection}>
                <HeaderElement header={meal.mealType} />

                {meal.recipeList.length > 0 ? (
                  <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={meal.recipeList}
                    renderItem={({ item }) => (
                      <HealthyCard
                        isNutrionPlanTbas={true}
                        name={item?.recipeName}
                        cookTime={item?.cookTime}
                        deliveryTime="15-20"
                        categories={[
                          `${item?.totalCalories} Kcal`,
                          `${item?.totalProtein} Protein`,
                          `${item?.totalCarbs} Carbs`,
                          `${item?.totalFat} Fats`,
                        ]}
                        kcal={item?.calories}
                        carbs={item?.carbs}
                        fat={item?.fat}
                        protein={item?.protein}
                        imageUri={item?.imageURL}
                        idRecipe={item?.recipeID}
                        numberElement={1.5}
                      />
                    )}
                    keyExtractor={(item) => item.recipeID}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <Text style={styles.noRecipes}>No recipes available</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      {!nutritionPlan && (
        <TouchableOpacity style={styles.shieldScreen} onPress={handleNavigatePlanNutrition}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              top: "30%",
            }}
          >
            <Image
              source={require("@/assets/images/tabsIconNav/shield.png")}
              style={{
                width: 70,
                height: 70,
                tintColor: "#800000",
              }}
            />
            <Text style={{ paddingHorizontal: 1, color: "#800000", fontSize: 20 }}>
              Set your Nutrition Plan
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {},
  headerText: { fontSize: 20, fontWeight: "bold" },
  shieldScreen: {
    backgroundColor: "#ccc",
    position: "absolute",
    opacity: 0.6,
    width: screenWidth,
    height: screenHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  contentScroll: {
    width: screenWidth,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerHome: {
    // fontSize: Css.fontTextLargest,
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "800",
    fontFamily: "Roboto",
    flex: 1,

    margin: 1,
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
  mealSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    flex: 1,
    width: "100%",
  },
  mealType: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  recipeCard: {
    width: 200,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    color: "#333",
  },
  recipeDetails: {
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
    color: "#555",
  },
  noRecipes: {
    fontSize: 16,
    paddingHorizontal: Css.paddingHoriAllPage,
    color: "#999",
  },
  listContainer: {
    gap: 10,
    paddingHorizontal: Css.paddingHoriAllPage,
  },
});

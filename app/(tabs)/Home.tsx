import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native";
import Header from "@/components/indexPage/Header";
import FindBySearch from "@/components/indexPage/FindBySearch";
import FoodCategory from "@/components/indexPage/FoodCategory";
import NavigateDailyTracking from "@/components/indexPage/NavigateDailyTracking";
import FearuredFoods from "@/components/indexPage/FearuredFoods";
import PopularItems from "@/components/indexPage/PopularItems";
import GridItems from "@/components/indexPage/GridItems";
import { Colors } from "@/constants/Colors";
import { calorieData, meal, hard } from "@/constants/data";
import { getAllRecipesService } from "@/services/recipeService";
import { getAllIngredientService } from "@/services/ingredientService";
import { getFavoriteTrending } from "@/services/favorite";
import Loading from "@/components/Loading";
import { useChoseState } from "@/store/choseStore";
import { getUserInformationPlan } from "@/services/authService";
import { getuserID } from "@/store/tokenHelper";
import { useUserData } from "@/store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ingredient, setIngredient] = useState<Ingredient>();
  const [trendingRecipe, setTrendingRecipe] = useState();
  const [userInformationPlan, setuserInformationPlan] = useState<any>();
  const id = getuserID();
  const { chose } = useChoseState();
  console.log(userInformationPlan, "userInformationPlan");
  const setUserData = useUserData((state) => state.setUserData);
  useEffect(() => {
    setUserData({
      age: userInformationPlan?.age,
      password: userInformationPlan?.password || null,
      email: userInformationPlan?.email || null,
      gender: userInformationPlan?.gender || null,
      weight: userInformationPlan?.weight || null,
      height: userInformationPlan?.height || null,
      activityFactor: userInformationPlan?.weight || null,
      nutritionPlan: userInformationPlan?.nutritionPlan || null,
      dietType: userInformationPlan?.dietType || null,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [recipesResponse, ingredientsResponse, trendingResponse, userInformationPlan] =
          await Promise.all([
            getAllRecipesService(),
            getAllIngredientService(),
            getFavoriteTrending(),
            getUserInformationPlan(id),
            chose(),
          ]);
        setRecipes(recipesResponse.data);
        setIngredient(ingredientsResponse.data);
        setTrendingRecipe(trendingResponse);
        setuserInformationPlan(userInformationPlan.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const gridItemsData = [
    { header: "Calorie Counters", calorieData: calorieData, line: 1 },
    { header: "Meal", calorieData: meal, line: 2 },
    { header: "Hard", calorieData: hard, line: 2 },
  ];

  const renderGridItem = ({ item }: { item: any }) => (
    <GridItems header={item.header} calorieData={item.calorieData} line={item.line} />
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Header />
          <FlatList
            data={gridItemsData}
            ListHeaderComponent={
              <>
                <FindBySearch />
                <NavigateDailyTracking />
                <FoodCategory action="navigate" categories={[...meal, ...calorieData]} />
                <FearuredFoods header={"All Recipes"} recipes={recipes} />
                <FearuredFoods header={"Trending Food"} recipes={trendingRecipe} />
                <PopularItems header={"Popular Ingredient"} ingredient={ingredient} />
              </>
            }
            renderItem={renderGridItem}
            keyExtractor={(item, index) => item.header}
            ListFooterComponent={<View style={{ height: 120 }} />}
            contentContainerStyle={styles.containerHome}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHome: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    gap: 18,
  },
});

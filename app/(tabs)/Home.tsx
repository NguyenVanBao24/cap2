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
import { getAllIngredientService, getIngredientServicePage } from "@/services/ingredientService";
import { getFavoriteTrending, getFavoriteUserId } from "@/services/favorite";
import Loading from "@/components/Loading";
import { useChoseState } from "@/store/choseStore";
import { getUserInformationPlan } from "@/services/authService";
import { getuserID } from "@/store/tokenHelper";
import { useUserData } from "@/store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavoriteStore } from "@/store/favorite";
import { isFavorite } from "@/constants/Css";

const Home = () => {
  const { getFavorite, allUserFavorite } = useFavoriteStore();

  const [recipes, setRecipes] = useState<Recipe>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ingredient, setIngredient] = useState<Ingredient>();
  const [trendingRecipe, setTrendingRecipe] = useState();
  const [userInformationPlan, setuserInformationPlan] = useState<any>();
  const userID = getuserID();
  const { chose } = useChoseState();

  const setUserData = useUserData((state) => state.setUserData);

  useEffect(() => {
    setUserData({
      fullname: userInformationPlan?.fullname,
      age: userInformationPlan?.age,
      email: userInformationPlan?.email,
      gender: userInformationPlan?.gender,
      height: userInformationPlan?.height,
      weight: userInformationPlan?.weight,
      password: userInformationPlan?.password,
      activityFactor: userInformationPlan?.activityFactor,
      nutritionPlan: userInformationPlan?.nutritionPlan,
      dietType: userInformationPlan?.dietType,
    });
  }, [userInformationPlan]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipesResponse = await getAllRecipesService();
        setRecipes(recipesResponse.data);
        const ingredientsResponse = await getIngredientServicePage();
        setIngredient(ingredientsResponse.data);
        const trendingResponse = await getFavoriteTrending();
        setTrendingRecipe(trendingResponse);
        getFavorite(userID);
        chose();
        const userInformationPlan = await getUserInformationPlan(userID);
        setuserInformationPlan(userInformationPlan.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const gridItemsData = [
    { header: "Calorie Counters", calorieData: calorieData, line: 1 },
    { header: "Meal", calorieData: meal, line: 2 },
    { header: "Hard", calorieData: hard, line: 2 },
  ];

  const renderGridItem = ({ item }: { item: any }) => (
    <GridItems header={item.header} calorieData={item.calorieData} line={item.line} />
  );

  if (loading) {
    return <Loading backgroundColor={Colors.primary} />;
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
                <FoodCategory action="navigate" categories={[...meal, ...calorieData, ...hard]} />
                <FearuredFoods header={"All Recipes"} recipes={recipes} />
                <FearuredFoods header={"Trending Food"} recipes={trendingRecipe} />
                <PopularItems header={"Popular Ingredient"} ingredient={ingredient} />
              </>
            }
            renderItem={renderGridItem}
            keyExtractor={(item, index) => `${item.header}-${index}`}
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
    backgroundColor: Colors.white,
  },

  containerHome: {
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
});

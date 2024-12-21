// @ts-nocheck

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { getRecipesServiceById } from "@/services/recipeService";
import { Ionicons } from "@expo/vector-icons";
import {
  getTrackingAll,
  getTrackingByUserIDDate,
  getTrackingNutritionID,
  postTrackingByUserIDDate,
  putTrackingByUserIDDate,
} from "@/services/tracking";
import { format } from "date-fns";
import { getuserID } from "@/store/tokenHelper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  capitalizeFirstLetter,
  Css,
  formatString,
  splitInstructionsToArray,
} from "@/constants/Css";
import PopularCard from "@/components/indexPage/PopularCard";
import { getAllIngredientService } from "@/services/ingredientService";
import Loading from "@/components/Loading";
import ReadMore from "react-native-read-more-text";
import { Chip } from "react-native-paper";
import { useFavoriteStore } from "@/store/favorite";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
interface DropdownItem {
  mealType: string;
  dailyNutritionTrackingID?: string;
}

type HandlePushMealsParams = {
  item: string;
  filteredData: DropdownItem[] | undefined;
  recipe: { data: { recipe_ID: string } } | undefined;
  currentDate: string;
  userID: string;
  handlePostMeal: (recipeIDs: string[], mealType: string, date: string, userID: string) => void;
  handlePostMeal1: (
    recipeIDs: string[],
    mealType: string,
    date: string,
    userID: string,
    trackingID: string
  ) => void;
};
const FoodDetailCard = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [isFavo, setIsFavo] = useState(true);
  const [trackingMeal, setTrackingMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ingredients");
  const { allUserFavorite, deleteFavorite, postFavorite } = useFavoriteStore();
  const userID = getuserID();
  const favoriteItem = allUserFavorite?.find((item) => item.recipeID === id);

  const [favoriteState, setFavoriteState] = useState({
    isFavo: !!favoriteItem,
    favoriteID: favoriteItem?.favoriteID || null,
  });

  const handleFavorite = async () => {
    setFavoriteState((prevState) => ({
      ...prevState,
      isFavo: !prevState.isFavo,
    }));
    try {
      favoriteState.isFavo
        ? await deleteFavorite(userID, favoriteState.favoriteID)
        : await postFavorite(userID, recipe?.data.recipe_ID);
    } catch (error) {
      console.log("Failer at hEALTHCARD", error);
    }
  };
  const renderTruncatedFooter = (handlePress: () => void) => {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.footerContainer}>
        <Text style={styles.moreText}>Xem thêm</Text>
      </TouchableOpacity>
    );
  };

  const renderRevealedFooter = (handlePress: () => void) => {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.footerContainer}>
        <Text style={styles.moreText}>Ẩn bớt</Text>
      </TouchableOpacity>
    );
  };
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const dropdownItems = [
    { label: "Breakfast", value: "BREAKFAST" },
    { label: "Lunch", value: "LUNCH" },
    { label: "Dinner", value: "DINNER" },
    { label: "Snack", value: "SNACK" },
  ];
  type Meal = {
    mealType: "BREAKFAST" | "LUNCH" | "DINNER";
    recipeIdList: string[];
  };

  type ApiRequestBody = {
    meals: Meal[];
    date: string;
    user_ID: string;
  };
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const fetchedRecipe = await getRecipesServiceById(id as string);
        setRecipe(fetchedRecipe);
      } catch (err) {
        setError("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    };

    const fetchMealTracking = async () => {
      setLoading(true);
      try {
        const response = await getTrackingByUserIDDate(userID, currentDate);
        setTrackingMeal(response?.data?.data);
      } catch (err) {
        setError("Failed to fetch recipe."); // Ghi lỗi nếu có
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchMealTracking();
    fetchRecipe();
  }, [id]);
  const [scrollY] = useState(new Animated.Value(0)); // Khởi tạo giá trị scroll

  let arrayItems = [
    recipe?.data.nutritionalQuality[0],
    recipe?.data.nutritionalQuality[1],
    recipe?.data.nutritionalQuality[2],
    recipe?.data.nutritionalQuality[3],
    recipe?.data?.mealType[0],
    recipe?.data?.mealType[1],
    recipe?.data?.mealType[2],
    recipe?.data?.mealType[3],
    recipe?.data.difficultyLevel,
  ];
  const handleBack = () => {
    router.back();
  };
  const [isListVisible, setIsListVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleList = () => {
    if (isListVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    setIsListVisible(!isListVisible);
  };

  const handlePostMeal = async (
    recipeList: string[],
    mealType: string,
    date: string,
    user_ID: string
  ) => {
    const requestBody = { recipeList, mealType, date, user_ID };
    try {
      const response = await postTrackingByUserIDDate(requestBody);
    } catch (err) {
      console.log(`Failed to fetch data for ${itemValue}`, err);
    }
  };

  const handlePostMeal1 = async (
    recipeList: string[],
    mealType: string,
    date: string,
    user_ID: string,
    dailyNutritionTrackingID: string
  ) => {
    try {
      const responseNutrionId = await getTrackingNutritionID(dailyNutritionTrackingID);

      const check = responseNutrionId?.data?.data?.recipeList?.some((item) => item == recipeList);
      console.log(check, "cknowledge");
      const data = [...responseNutrionId?.data?.data?.recipeList, ...recipeList];
      const requestBody = { recipeList: data, mealType, date, user_ID };
      check ? setlable(true) : await putTrackingByUserIDDate(dailyNutritionTrackingID, requestBody);
    } catch (err) {
      console.log(`Failed to fetch data for ${itemValue}`, err);
    }
  };
  // const [lable, setlable] = useState(false);

  // if (lable) {
  //   return (
  //     <TouchableWithoutFeedback onPress={() => setIsListVisible(!isListVisible)}>
  //       <View style={styles.overlay} />
  //     </TouchableWithoutFeedback>
  //   );
  // }

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(trackingMeal?.meals);
  }, [trackingMeal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ingredientsResponse = await getAllIngredientService();

        setIngredient(ingredientsResponse.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading backgroundColor={Colors.primary} />;
  }

  const handlePushMeals = ({
    item,
    filteredData,
    recipe,
    currentDate,
    userID,
    handlePostMeal,
    handlePostMeal1,
  }: HandlePushMealsParams): void => {
    const matchedData =
      filteredData?.length > 0 &&
      filteredData?.find((dropdownItem) => item === dropdownItem?.mealType);

    if (matchedData && matchedData.dailyNutritionTrackingID) {
      const dailyNutritionTrackingID = matchedData.dailyNutritionTrackingID;

      handlePostMeal1(
        [recipe?.data.recipe_ID || ""],
        item,
        currentDate,
        userID,
        dailyNutritionTrackingID
      );
    } else {
      handlePostMeal([recipe?.data.recipe_ID || ""], item, currentDate, userID);
    }
    setIsListVisible(!isListVisible);
  };

  const instructions = splitInstructionsToArray(recipe?.data.cookingInstructions);

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleBack}
          style={{
            position: "absolute",
            zIndex: 1,
            flexDirection: "row",
            alignItems: "center",
            top: Css.paddingHoriIntro,
          }}
        >
          <Ionicons name="arrow-back" style={{ paddingHorizontal: 20 }} size={24} />
        </TouchableOpacity>

        {/* main */}
        <ScrollView style={styles.body}>
          <View style={styles.imageHeader}>
            <View style={styles.header}>
              <Image source={{ uri: `${recipe?.data?.imageURL}` }} style={styles.image} />
            </View>
          </View>

          <View style={styles.bodyContent}>
            <Text style={styles.title}>{recipe?.data?.recipeName}</Text>

            {/* list icon */}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.nutrition}>
                <View style={{ marginBottom: 8 }}>
                  <Image
                    source={require("@/assets/images/caloriIcon.png")}
                    style={{ height: 25, width: 25, resizeMode: "contain" }}
                  />
                </View>
                <Text style={[styles.nutrient, { color: Colors.textInput }]}>
                  {recipe?.data?.totalCalories} Kcal
                </Text>
              </View>

              <View style={styles.nutrition}>
                <View style={{ marginBottom: 8 }}>
                  <Image
                    source={require("@/assets/images/timeIcon.png")}
                    style={{ height: 25, width: 25, resizeMode: "contain" }}
                  />
                </View>
                <Text style={[styles.nutrient, { color: Colors.textInput }]}>
                  {recipe?.data?.prepTime} | {recipe?.data?.cookTime} min
                </Text>
              </View>

              <View style={styles.nutrition}>
                <View style={{ marginBottom: 8 }}>
                  <Image
                    source={require("@/assets/images/cookIcon.png")}
                    style={{ height: 25, width: 25, resizeMode: "contain" }}
                  />
                </View>
                <Text style={[styles.nutrient, { color: Colors.textInput }]}>
                  {recipe?.data?.difficultyLevel}
                </Text>
              </View>
            </View>

            {/* description */}
            <View style={styles.containerDes}>
              <ReadMore
                numberOfLines={2}
                renderTruncatedFooter={renderTruncatedFooter}
                renderRevealedFooter={renderRevealedFooter}
              >
                <Text style={styles.des}>{recipe?.data?.description}</Text>
              </ReadMore>
            </View>

            {/* navigate */}
            <View style={styles.itemNavigate}>
              {arrayItems?.map(
                (item, index) =>
                  item != null && (
                    <Chip key={index} onPress={() => console.log("Pressed")}>
                      {formatString(item)}
                    </Chip>
                  )
              )}
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "ingredients" && styles.activeTab]}
                onPress={() => setActiveTab("ingredients")}
              >
                <Text style={[styles.tabText, activeTab === "ingredients" && styles.activeTabText]}>
                  Ingredients
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "instructions" && styles.activeTab]}
                onPress={() => setActiveTab("instructions")}
              >
                <Text
                  style={[styles.tabText, activeTab === "instructions" && styles.activeTabText]}
                >
                  Cooking Instructions
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab !== "ingredients" ? (
              <View style={styles.cookingInstructions}>
                {/* <Text style={styles.title}>Instructions</Text> */}
                {instructions.map((instruction, index) => (
                  <Text key={`${instruction}_${index}`} style={styles.step}>
                    {instruction}
                  </Text>
                ))}
              </View>
            ) : (
              <View style={styles.ingredientListContainer}>
                <FlatList
                  contentContainerStyle={styles.listContainer}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={recipe?.data?.ingredientList}
                  keyExtractor={(item, index) => `${item.ingredientId}_${index}`}
                  renderItem={({ item }) => (
                    <PopularCard
                      direction={false}
                      numberElement={2}
                      name={item.ingredientName}
                      unit={item.unit}
                      calories={item.calories}
                      deliveryTime="15-20 mins"
                      imageUri={item.imageURL}
                      id={item.ingredientId}
                    />
                  )}
                />
              </View>
            )}
          </View>
          <View style={{ height: 20 }}></View>
        </ScrollView>

        {/* last */}
        {isListVisible && (
          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [400, 0], // Di chuyển từ dưới lên
                    }),
                  },
                ],
              },
            ]}
          >
            {recipe?.data?.mealType?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handlePushMeals({
                    item,
                    filteredData,
                    recipe,
                    currentDate,
                    userID,
                    handlePostMeal,
                    handlePostMeal1,
                  })
                }
                style={{
                  borderColor: Colors.primary,
                }}
              >
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        {isListVisible && (
          <TouchableWithoutFeedback onPress={() => setIsListVisible(!isListVisible)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={toggleList} style={styles.addButton}>
            <FontAwesome5 name="plus" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <FontAwesome5 name="star" size={16} color={!favoriteState.isFavo ? Colors.white : "red"} />
      </TouchableOpacity>
    </View>
  );
};

export default FoodDetailCard;

const styles = StyleSheet.create({
  favoriteIcon: {
    padding: 6,
    position: "absolute",
    top: Css.paddingHoriIntro - 4,
    right: 10,
    backgroundColor: "#ddd",
    borderRadius: "50%",
  },
  ingredientListContainer: {},
  listContainer: {
    flexDirection: "column",
    gap: 14,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    paddingVertical: 20,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    zIndex: 1,
    width: screenWidth,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginVertical: 10,
  },
  addButtonContainer: {
    flexDirection: "row",
    gap: 2,
    position: "absolute",
    right: 20,
    bottom: 40,
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  dropdown: {
    position: "absolute",
    right: 20,
    bottom: 100,
    padding: 10,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },
  body: {
    flex: 1,
    paddingHorizontal: Css.paddingHoriAllPage,
  },
  bodyContent: {},
  imageHeader: {},
  header: {
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.36,
    resizeMode: "cover",
  },
  nutrition: {
    flexDirection: "column",
    alignItems: "center",
  },
  nutrient: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
  breakdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  containerDes: {
    padding: 10,
  },
  itemNavigate: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
    paddingBottom: 16,
  },
  cookingInstructions: {},
  cookingInstructionsText: { fontSize: 14, fontWeight: 500 },
  itemInfor: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#ddd",
    borderRadius: 16,
  },
  des: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "justify",
    color: "#131010",
  },
  recipes: {
    backgroundColor: Colors.grayBackGround,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
    color: Colors.textInput,
  },

  showMore: {
    color: "green",
    marginTop: 5,
  },
  calorieBurn: {
    alignItems: "center",
    marginVertical: 20,
  },
  calorieText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activity: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },

  addButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  overlay: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF", // Replace Colors.white
    zIndex: 99,
    position: "absolute",
    opacity: 0.9,
  },
  moreText: {
    marginTop: 5,
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#007BFF",
  },
  step: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    paddingVertical: 20,
    borderRadius: 4,
    borderBottomWidth: 1, // Thay đổi sang viền ở dưới
    borderBottomColor: "#ccc", // Màu của viền
  },
  footerContainer: {
    flexDirection: "row", // Arrange text in a row if needed
    justifyContent: "flex-end", // Align text to the right end
  },
});

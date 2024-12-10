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
  SafeAreaView,
  StatusBar,
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
import { capitalizeFirstLetter, Css, splitInstructions } from "@/constants/Css";
import PopularCard from "@/components/indexPage/PopularCard";
import { getAllIngredientService } from "@/services/ingredientService";
import Loading from "@/components/Loading";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const FoodDetailCard = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [isFavo, setIsFavo] = useState(true);
  const [trackingMeal, setTrackingMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const userID = getuserID();
  const dropdownItems = [
    { label: "Breakfast", value: "BREAKFAST" },
    { label: "Lunch", value: "LUNCH" },
    { label: "Dinner", value: "DINNER" },
    { label: "Snack", value: "SNACK" },
  ];
  console.log(recipe, "recipe123");
  type Meal = {
    mealType: "BREAKFAST" | "LUNCH" | "DINNER"; // Các kiểu bữa ăn
    recipeIdList: string[]; // Danh sách ID công thức
  };

  type ApiRequestBody = {
    meals: Meal[]; // Danh sách các bữa ăn
    date: string; // Ngày (YYYY-MM-DD)
    user_ID: string; // ID người dùng
  };
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const fetchedRecipe = await getRecipesServiceById(id as string);
        setRecipe(fetchedRecipe);
      } catch (err) {
        setError("Failed to fetch recipe."); // Ghi lỗi nếu có
      } finally {
        setLoading(false); // Kết thúc loading
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

  // Lắng nghe giá trị scroll và map opacity
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 200], // Scroll từ 0 đến 200
    outputRange: ["red", "white"], // Từ đỏ đến trắng
    extrapolate: "clamp", // Giới hạn giá trị trong khoảng
  });

  let arrayItems = [
    recipe?.data.nutritionalQuality,
    recipe?.data?.mealType[0],
    recipe?.data?.mealType[1],
    recipe?.data?.mealType[2],
    recipe?.data?.mealType[3],
    recipe?.data.difficultyLevel,
  ];
  console.log(arrayItems);
  const handleBack = () => {
    router.back();
  };
  const [isListVisible, setIsListVisible] = useState(false); // Quản lý trạng thái của danh sách
  const [animation] = useState(new Animated.Value(0)); // Hiệu ứng hoạt hình
  const handleFavorite = () => {
    setIsFavo(!isFavo);
    postFavoriteUserId(userID, id);
  };
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

    setIsListVisible(!isListVisible); // Cập nhật trạng thái hiển thị danh sách
  };

  const handlePostMeal = async (
    recipeList: string[],
    mealType: string,
    date: string,
    user_ID: string
  ) => {
    console.log("handlePostMeal");

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
    console.log(dailyNutritionTrackingID, "handlePostMeal1");
    try {
      const responseNutrionId = await getTrackingNutritionID(dailyNutritionTrackingID);
      const data = [...responseNutrionId?.data?.data?.recipeList, ...recipeList];
      const requestBody = { recipeList: data, mealType, date, user_ID };
      const response = await putTrackingByUserIDDate(dailyNutritionTrackingID, requestBody);
    } catch (err) {
      console.log(`Failed to fetch data for ${itemValue}`, err);
    }
  };
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(trackingMeal.meals);
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
            flex: 1,
            width: "100%",
          }}
        >
          <Ionicons name="arrow-back" style={{ paddingHorizontal: 20 }} size={24} />
        </TouchableOpacity>

        {/* main */}
        <ScrollView style={styles.body}>
          <View style={styles.imageHeader}>
            <View style={styles.header}>
              <Image source={{ uri: `${recipe?.data.imageURL}` }} style={styles.image} />
            </View>
          </View>

          <View style={styles.bodyContent}>
            <Text style={styles.title}>{recipe?.data.recipeName}</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.nutrition}>
                <View style={{ height: 40, marginBottom: 8 }}>
                  <Image
                    source={require("@/assets/images/caloriIcon.png")}
                    style={{ height: 48, width: 48, resizeMode: "contain" }}
                  />
                </View>
                <Text style={[styles.nutrient, { color: Colors.textInput }]}>
                  {recipe?.data.totalCalories} Kcal
                </Text>
              </View>

              <View style={styles.nutrition}>
                <View style={{ height: 40, marginBottom: 8 }}>
                  <Image
                    source={require("@/assets/images/timeIcon.png")}
                    style={{ height: 40, width: 40, resizeMode: "cover" }}
                  />
                </View>
                <Text style={[styles.nutrient, { color: Colors.textInput }]}>
                  {recipe?.data.prepTime} | {recipe?.data.cookTime} min
                </Text>
              </View>

              <View style={styles.nutrition}>
                <View style={{ height: 40, marginBottom: 8 }}>
                  <Image
                    source={require("@/assets/images/cookIcon.png")}
                    style={{ height: 40, width: 40, resizeMode: "contain" }}
                  />
                </View>
                <Text style={[styles.nutrient, { color: Colors.textInput }]}>
                  {recipe?.data.difficultyLevel}
                </Text>
              </View>
            </View>

            <View style={styles.containerDes}>
              <Text style={styles.des}>{recipe?.data.description}</Text>
            </View>
            <View style={styles.itemNavigate}>
              {arrayItems?.map(
                (item) => item != null && <Text style={styles.itemInfor}>{item}</Text>
              )}
            </View>

            <View style={styles.cookingInstructions}>
              <Text style={styles.cookingInstructionsText}>
                {recipe?.data.cookingInstructions ?? ""}
              </Text>
            </View>

            <View style={styles.ingredientListContainer}>
              <FlatList
                contentContainerStyle={styles.listContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recipe?.data?.ingredientList}
                keyExtractor={(item) => item.ingredientId}
                renderItem={({ item }) => (
                  <PopularCard
                    numberElement={2}
                    name={item.ingredientName}
                    unit={item.unit}
                    deliveryTime="15-20 mins"
                    imageUri={item.imageURL}
                    id={item.ingredientId}
                  />
                )}
              />
            </View>
          </View>
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
                onPress={() => {
                  const matchedData =
                    filteredData?.length > 0 &&
                    filteredData.find((dropdownItem) => item == dropdownItem?.mealType);
                  // console.log(item.value, "sssss");
                  if (matchedData) {
                    const dailyNutritionTrackingID = matchedData.dailyNutritionTrackingID;
                    handlePostMeal1(
                      [recipe?.data.recipe_ID],
                      item,
                      currentDate,
                      userID,
                      dailyNutritionTrackingID
                    );
                  } else {
                    handlePostMeal([recipe?.data.recipe_ID], item, currentDate, userID);
                  }
                }}
                style={{ borderColor: Colors.primary }}
              >
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={toggleList} style={styles.addButton}>
            <FontAwesome5 name="plus" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <FontAwesome5 name="star" size={16} color={!isFavo ? Colors.black : Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default FoodDetailCard;

const styles = StyleSheet.create({
  favoriteIcon: {
    padding: 6,
    position: "absolute",
    top: 42,
    right: 10,
    backgroundColor: "#ddd",
    borderRadius: "50%",
  },
  ingredientListContainer: {},
  listContainer: { paddingHorizontal: Css.paddingHoriAllPage, gap: Css.paddingHoriAllPage },
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
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  addButtonContainer: {
    flexDirection: "row",
    gap: 2,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: Colors.white,
    padding: 10,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },
  body: {
    flex: 1,
    paddingHorizontal: Css.paddingHoriAllPageSmall,
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
    marginVertical: 10,
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
    paddingVertical: 10,
  },
  itemNavigate: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
  },
  cookingInstructions: {},
  cookingInstructionsText: { fontSize: 14 },
  itemInfor: { padding: 8, fontSize: 12, backgroundColor: "#ddd", borderRadius: 16 },
  des: { fontSize: 16, fontWeight: "400", lineHeight: 20 },
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
});

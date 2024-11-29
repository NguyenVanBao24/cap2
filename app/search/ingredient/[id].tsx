import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { getRecipesServiceById } from "@/services/recipeService";
import { SafeAreaView } from "react-native-safe-area-context";
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
const screenWidth = Dimensions.get("window").width;
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
        console.log(response?.data?.data, "response?.data?.data");
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

  const handleBack = () => {
    router.back();
  };
  const [isListVisible, setIsListVisible] = useState(false); // Quản lý trạng thái của danh sách
  const [animation] = useState(new Animated.Value(0)); // Hiệu ứng hoạt hình
  const handleFavorite = () => {
    setIsFavo(!isFavo);
    postFavoriteUserId(userID, id);
  };
  // Hàm để hiển thị/ẩn danh sách
  const toggleList = () => {
    if (isListVisible) {
      // Nếu danh sách đang hiển thị, ẩn nó đi
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
  console.log(filteredData, "11111111111111");
  useEffect(() => {
    setFilteredData(trackingMeal.meals);
  }, [trackingMeal]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
      <View style={styles.container}>
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
        </TouchableOpacity>
        <View>
          <View>
            <View style={styles.header}>
              <Image source={{ uri: `${recipe?.data.imageURL}` }} style={styles.image} />
            </View>
            <Text style={styles.title}>{recipe?.data.recipeName}</Text>
          </View>

          {/* Nutritional Information */}
          <View style={styles.nutrition}>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {recipe?.data.totalCalories}
              {"\n"}Calories
            </Text>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {recipe?.data.totalCarbs}
              {"\n"}Carbs (g)
            </Text>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {recipe?.data.totalProtein}
              {"\n"}Protein (g)
            </Text>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {recipe?.data.totalFat}
              {"\n"}Fat (g)
            </Text>
          </View>

          <View style={styles.containerDes}>
            <Text style={styles.des}>{recipe?.data.description}</Text>
          </View>

          {/* Nutritional Breakdown */}
          <View style={styles.breakdown}>
            <Text style={styles.recipes}>Sugars: 5 g</Text>
            <Text style={styles.recipes}>Fiber: 3 g</Text>
            <Text style={styles.recipes}>Sodium: 200 mg</Text>
            <Text style={styles.recipes}>Cholesterol: 15 mg</Text>
            <Text style={styles.recipes}>Vitamin C: 20 mg</Text>
            <Text style={styles.recipes}>Calcium: 30 mg</Text>
          </View>
        </View>

        {/* Calorie Burning Options */}

        <View style={styles.calorieBurn}>
          <Text style={styles.calorieText}>How to burn {recipe?.data.totalCalories} calories</Text>
          <View style={styles.activity}>
            <Text>🏃‍♂️ 50 min</Text>
            <Text>🚴‍♀️ 38 min</Text>
            <Text>🏋️‍♂️ 15 min</Text>
          </View>
        </View>
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
                      outputRange: [200, 0], // Di chuyển từ dưới lên
                    }),
                  },
                ],
              },
            ]}
          >
            {dropdownItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const matchedData =
                    filteredData?.length > 0 &&
                    filteredData.find((dropdownItem) => item.value == dropdownItem?.mealType);
                  console.log(item.value, "sssss");
                  if (matchedData) {
                    console.log(matchedData.dailyNutritionTrackingID, "ddddd");
                    const dailyNutritionTrackingID = matchedData.dailyNutritionTrackingID;
                    console.log(matchedData.dailyNutritionTrackingID, "eeeee");

                    handlePostMeal1(
                      [recipe?.data.recipe_ID],
                      item.value,
                      currentDate,
                      userID,
                      dailyNutritionTrackingID
                    );
                  } else {
                    handlePostMeal([recipe?.data.recipe_ID], item.value, currentDate, userID);
                  }
                }}
                style={{ borderColor: Colors.primary }}
              >
                <Text style={styles.dropdownItem}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
        {/* Add to Diary Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={toggleList} style={styles.addButton}>
            <FontAwesome5 name="plus" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <Ionicons name={!isFavo ? "heart" : "heart-outline"} size={24} color={Colors.primary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FoodDetailCard;

const styles = StyleSheet.create({
  favoriteIcon: {
    padding: 6,
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 20,
    position: "relative", // Để các phần tử tuyệt đối hoạt động chính xác
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
    bottom: 70,
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
    bottom: 140,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    textAlign: "right",
  },

  header: {
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: 250,
  },

  nutrition: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
    flexDirection: "row", //
    flexWrap: "wrap",
    gap: 8,
  },
  containerDes: {
    paddingVertical: 10,
  },
  des: { fontSize: 14, fontWeight: "500" },
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

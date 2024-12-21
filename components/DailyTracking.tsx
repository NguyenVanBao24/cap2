import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { addDays, format, subDays } from "date-fns";
import FoodCard from "@/components/DailyTracking/FoodCard";
import TabMenu from "@/components/DailyTracking/TabMenu";
import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { getTrackingByUserIDDate } from "@/services/tracking";
import { getuserID } from "@/store/tokenHelper";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/Loading";
import { Entypo } from "@expo/vector-icons";

interface NutritionData {
  user_ID: string;
  date: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  daily_Nutrition_Tracking_ID: string;
}

export interface NutritionTrackingResponse {
  code: number;
  message: string;
  data: NutritionTrackingDetail;
}

export interface NutritionTrackingDetail {
  date: string; // Ngày theo định dạng YYYY-MM-DD
  calories: number; // Tổng số calo
  protein: number; // Tổng số protein
  fat: number; // Tổng số chất béo
  carbs: number; // Tổng số carb
  meals: Meal[]; // Danh sách bữa ăn
}

export interface Meal {
  mealType: "BREAKFAST" | "LUNCH" | "DINNER"; // Loại bữa ăn
  recipeList: Recipe[]; // Danh sách công thức nấu ăn trong bữa ăn
}

export interface Recipe {
  imageURL: string;
  recipeID: string; // ID của công thức nấu ăn
  recipeName: string; // Tên của công thức nấu ăn
  calories: number; // Calo trong món ăn
  protein: number; // Protein trong món ăn
  carbs: number; // Carb trong món ăn
  fat: number; // Chất béo trong món ăn
}

const DailyTracking: React.FC = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [headerText, setHeaderText] = useState("Today");
  const [nutritionData, setNutritionData] = useState<NutritionTrackingResponse | null>(null);
  const [noDataMessage, setNoDataMessage] = useState<string>("");
  const [recipeList, setRecipeList] = useState<Recipe>();
  const [selectedTab, setSelectedTab] = useState<"BREAKFAST" | "LUNCH" | "DINNER" | "SNACK">(
    "BREAKFAST"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const userID = getuserID();
  useFocusEffect(
    useCallback(() => {
      const fetchTrackingData = async () => {
        try {
          setLoading(true);
          if (userID) {
            const response = await getTrackingByUserIDDate(userID, selectedDate);
            setNutritionData(response?.data);
            setNoDataMessage("");
          } else {
            setNoDataMessage("User ID is not available.");
          }
        } catch (error) {
          setNoDataMessage("No data available for today.");
          console.log("Error fetching tracking data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTrackingData();

      return () => {
        setNutritionData(null);
      };
    }, [selectedDate])
  );

  const handleCalendarToggle = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleDayPress = (day: any) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);

    const today = new Date();
    const differenceInDays = Math.floor(
      (new Date(selectedDate).getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      setHeaderText("Today");
    } else if (differenceInDays === 1) {
      setHeaderText("Tomorrow");
    } else if (differenceInDays === -1) {
      setHeaderText("Yesterday");
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setHeaderText(selectedDate);
    }

    setCalendarVisible(false); // Đóng lịch sau khi chọn
  };

  const filteredMeals = nutritionData
    ? nutritionData?.data?.meals?.filter(
        (meal) => meal.mealType.toLowerCase() === selectedTab.toLowerCase()
      )
    : [];

  const [position, setPosition] = useState(new Animated.ValueXY({ x: 20, y: 500 }));
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        position.flattenOffset();
      },
    })
  ).current;

  if (loading) {
    return <Loading backgroundColor={Colors.primary_2} />;
  }
  const handlePreviousDay = () => {
    // Giảm 1 ngày
    const newDate = format(subDays(new Date(selectedDate), 1), "yyyy-MM-dd");
    setSelectedDate(newDate);
    setHeaderText(newDate);
  };

  const handleNextDay = () => {
    // Tăng 1 ngày
    const newDate = format(addDays(new Date(selectedDate), 1), "yyyy-MM-dd");
    setSelectedDate(newDate);
    setHeaderText(newDate);
  };
  return (
    <View style={styles.safeArea}>
      <Modal
        isVisible={isCalendarVisible}
        onBackdropPress={handleCalendarToggle}
        style={styles.modalStyle}
      >
        <View style={styles.modalContent}>
          <Calendar
            current={selectedDate} // Đặt ngày hiển thị ban đầu
            onDayPress={handleDayPress} // Hàm xử lý khi nhấn vào ngày
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: Colors.primary_2, // Màu cho ngày đã chọn
              },
            }}
          />
        </View>
      </Modal>

      <View style={styles.headerTrack}>
        <TouchableOpacity onPress={handlePreviousDay}>
          <View style={styles.caledarHorizontalIcon}>
            <Entypo name="chevron-left" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarToggle} style={styles.caledarIcon}>
          <Text style={styles.headerTrackText}>{headerText}</Text>
          <AntDesign name="calendar" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextDay}>
          <View style={styles.caledarHorizontalIcon}>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.mealCategoryRow}>
          <TabMenu
            selectedTab={selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1).toLowerCase()}
            onTabSelect={setSelectedTab}
          />
        </View>

        <ScrollView>
          {noDataMessage ? (
            <Text style={styles.noDataText}>{noDataMessage}</Text>
          ) : (
            filteredMeals?.map((meal: any, index: any) => (
              <View key={index} style={styles.mealContainer}>
                {meal.recipeList?.map((recipe: any, index2: any) => (
                  <FoodCard
                    key={index2}
                    calories={recipe.calories}
                    protein={recipe.protein}
                    fat={recipe.fat}
                    carbs={recipe.carbs}
                    date={nutritionData?.data.date}
                    recipeName={recipe.recipeName}
                    recipeID={recipe.recipeID}
                    imageURL={recipe.imageURL}
                    nutritionId={nutritionData?.data?.meals[0].dailyNutritionTrackingID}
                  />
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: Css.paddingHoriAllPage,
  },
  draggableContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerTrack: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caledarHorizontalIcon: {
    backgroundColor: "#D6EAEE",
    borderRadius: "50%",
    padding: 12,
  },
  caledarIcon: {
    backgroundColor: "#D6EAEE",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    gap: 20,
  },
  headerTrackText: { fontSize: Css.fontTextLarge, fontWeight: "600" },
  mealCategoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  mealContainer: {
    marginVertical: 4,
    gap: 4,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.gray,
    marginTop: 20,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "green", // Màu xanh
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Để nó xuất hiện ở một vị trí cố định
    bottom: 100, // Cách dưới cùng
    right: 20, // Cách phải
  },
});

export default DailyTracking;

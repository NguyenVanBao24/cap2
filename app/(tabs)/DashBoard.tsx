import React, { useState, useRef, useCallback } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, View, Text, FlatList } from "react-native";
import CircularProgressBar from "@/components/CircularProgressBar";
import { Colors } from "@/constants/Colors";
import DailyTracking from "../../components/DailyTracking";
import { useFocusEffect } from "expo-router";
import { getuserID } from "@/store/tokenHelper";
import { format } from "date-fns";
import { getTrackingByUserIDDate } from "@/services/tracking";
import { getNutritionCalculation } from "@/services/chose";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/Loading";
const { height: screenHeight } = Dimensions.get("window");

const SNAP_POINTS = [screenHeight * 0.4, screenHeight * 0.2, 0]; // 60%, 80%, 100%
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

const HomeScreen = () => {
  const [nutritionData, setNutritionData] = useState<NutritionTrackingResponse | null>(null);
  const [nutritionCalculation, setNutritionCalculation] = useState<any | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const userID = getuserID();
  useFocusEffect(
    useCallback(() => {
      const fetchTrackingData = async () => {
        try {
          setLoading(true); // Bắt đầu tải
          if (userID) {
            const trackingByUserIDDateResponse = await getTrackingByUserIDDate(
              userID,
              selectedDate
            );
            const nutritionCalculation = await getNutritionCalculation(userID);

            setNutritionData(trackingByUserIDDateResponse?.data);
            setNutritionCalculation(nutritionCalculation?.data);
            setNoDataMessage("");
          } else {
            setNoDataMessage("User ID is not available.");
          }
        } catch (error) {
          setNoDataMessage("No data available for today.");
          console.log("Error fetching tracking data:", error);
        } finally {
          setLoading(false); // Dừng tải
        }
      };

      fetchTrackingData();

      // Cleanup function nếu cần (tuỳ thuộc vào yêu cầu)
      return () => {
        setNutritionData(null); // Reset dữ liệu khi tab bị unfocus (tuỳ ý)
      };
    }, [selectedDate]) // `selectedDate` là dependency
  );
  const translateY = useRef(new Animated.Value(SNAP_POINTS[0])).current;
  const component2Opacity = useRef(new Animated.Value(1)).current;
  const component3Height = useRef(new Animated.Value(screenHeight * 0.2)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newY = Math.min(
          Math.max(gestureState.dy + translateY._value, SNAP_POINTS[2]),
          SNAP_POINTS[0]
        );
        translateY.setValue(newY);

        if (newY <= SNAP_POINTS[1]) {
          // 80% or 100%
          Animated.timing(component2Opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(component3Height, {
            toValue: screenHeight * 0.01,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // 60%
          Animated.timing(component2Opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(component3Height, {
            toValue: screenHeight * 0.2,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const velocityThreshold = 50000; // Giảm tốc độ (chỉnh giá trị này theo yêu cầu) để giảm độ nhạy
        const distanceThreshold = 0.2 * screenHeight; // 20% của chiều cao màn hình

        let newIndex = 0;

        if (Math.abs(gestureState.vy) > velocityThreshold) {
          if (gestureState.vy < 0) {
            newIndex = SNAP_POINTS.findIndex((p) => p < translateY._value);
          } else {
            newIndex = SNAP_POINTS.findIndex((p) => p > translateY._value) - 1;
          }
        } else {
          newIndex = SNAP_POINTS.reduce((prev, curr, index) => {
            return Math.abs(curr - translateY._value) <
              Math.abs(SNAP_POINTS[prev] - translateY._value)
              ? index
              : prev;
          }, 0);
        }

        newIndex = Math.max(0, Math.min(newIndex, SNAP_POINTS.length - 1));

        // Giảm tốc độ di chuyển của Animated.spring
        Animated.spring(translateY, {
          toValue: SNAP_POINTS[newIndex],
          friction: 10, // Giảm lực ma sát để chuyển động chậm hơn
          tension: 40, // Giảm độ căng của animation
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  if (loading) {
    return <Loading backgroundColor={Colors.primary_2} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.Dashboardheader}>
          <View style={styles.header}>
            <View style={styles.containerTextHeader}>
              <Text style={styles.textHeaderUp}>{nutritionData?.data?.totalCalories}</Text>
              <Text style={styles.textHeaderDown}>Eaten</Text>
            </View>
            <CircularProgressBar
              currentValue={nutritionData?.data?.totalCalories}
              totalValue={nutritionCalculation?.caloriesNeeded}
              radius={50}
              strokeWidth={8}
              TextColorUp="#fff"
              TextColorDown="#180161"
              hideText={true}
            />
            <View style={styles.containerTextHeader}>
              <Text style={styles.textHeaderUp}>0</Text>
              <Text style={styles.textHeaderDown}>Burned</Text>
            </View>
          </View>

          <View style={styles.upbody}>{/* <FlatList data={}/> */}</View>

          <View style={styles.body}>
            <Text style={styles.headerDashboard}>Macronutrients</Text>
            <View style={styles.underline}></View>
            <View style={styles.dashboard}>
              <CircularProgressBar
                currentValue={nutritionData?.data?.totalProtein}
                totalValue={nutritionCalculation?.proteinNeeded}
                TextSize={13}
                radius={30}
                strokeWidth={7}
                color="#FA7070"
                strokeColor="#FAD4D4"
                typeNutrion="Protein"
              />
              <CircularProgressBar
                currentValue={nutritionData?.data?.totalCarbs}
                TextSize={13}
                totalValue={nutritionCalculation?.carbsNeeded}
                radius={30}
                strokeWidth={7}
                color="#FABC3F"
                strokeColor="#EEDF7A"
                typeNutrion="Carbs"
              />
              <CircularProgressBar
                currentValue={nutritionData?.data?.totalFat}
                TextSize={13}
                totalValue={nutritionCalculation?.fatNeeded}
                radius={30}
                strokeWidth={7}
                color="#4793AF"
                strokeColor="#C4E4FF"
                typeNutrion="Fats"
              />
            </View>
          </View>
        </View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.bodyContainer, { transform: [{ translateY }] }]}
        >
          <View style={{ height: 10 }}></View>
          <DailyTracking />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary_2 },
  containerMeal: {
    flex: 1,
  },
  Dashboardheader: {
    position: "absolute",
    top: 0,
    height: screenHeight * 0.6,
    width: "100%",
    backgroundColor: Colors.primary_2,
    borderTopColor: "#fff",
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  containerTextHeader: { flexDirection: "column", alignItems: "center", marginTop: 20 },
  textHeaderUp: { color: Colors.white, fontWeight: "600", fontSize: 15 },
  textHeaderDown: { color: "#180161", fontWeight: "600", fontSize: 15 },

  upbody: {},

  body: {
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 14,
    marginTop: 6,
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 50,
  },
  headerDashboard: { color: "#180161", fontWeight: "600", fontSize: 20, marginBottom: 10 },
  underline: { width: 100, height: 20, borderColor: "#180161", borderTopWidth: 2 },
  dashboard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    height: screenHeight,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  mealCategoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.gray,
    marginTop: 20,
  },
  mealContainer: {
    marginVertical: 4,
    gap: 4,
  },
});

export default HomeScreen;

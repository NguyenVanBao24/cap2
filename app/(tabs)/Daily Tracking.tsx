import FoodCard from "@/components/DailyTracking/FoodCard";
import TabMenu from "@/components/DailyTracking/TabMenu";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Card, Button, IconButton, TouchableRipple } from "react-native-paper";

interface MealItem {
  name: string;
  calories: number;
  amount: string;
  protein: number;
  carbs: number;
  fat: number;
  image: ImageSourcePropType;
}

const DailyTracking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const generateDateArray = (): Date[] => {
    const dates: Date[] = [];
    for (let i = -2; i <= 2; i++) {
      const newDate = new Date();
      newDate.setDate(selectedDate.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  };

  const formatMonth = (date: Date): string => {
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  const formatDay = (date: Date): string => {
    return date.getDate().toString();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Header title="Daily Tracking" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datePickerRow}>
          {generateDateArray().map((date, index) => (
            <TouchableRipple
              key={index}
              onPress={() => setSelectedDate(date)}
              style={[
                styles.outdatePicker,
                date.toDateString() === selectedDate.toDateString() && styles.activeoutdatePicker,
              ]}
            >
              <View
                style={[
                  styles.datePicker,
                  date.toDateString() === selectedDate.toDateString() && styles.activeDate,
                ]}
              >
                <View style={styles.dateTextContainer}>
                  <Text
                    style={[
                      styles.monthText,
                      date.toDateString() === selectedDate.toDateString() && styles.activeDayText,
                    ]}
                  >
                    {formatMonth(date)}
                  </Text>
                  <Text
                    style={[
                      styles.dayText,
                      date.toDateString() === selectedDate.toDateString() && styles.activeDayText,
                    ]}
                  >
                    {formatDay(date)}
                  </Text>
                </View>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
      </View>

      <View style={styles.mealCategoryRow}>
        <TabMenu />
      </View>

      <View>
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </View>
    </ScrollView>
  );
};

// Meal items như cũ
const mealItems: MealItem[] = [
  {
    name: "Salad with egg",
    calories: 294,
    amount: "100 G",
    protein: 25,
    carbs: 21,
    fat: 14,
    image: require("@/assets/images/food.jpg"),
  },
  {
    name: "Green vegetable",
    calories: 394,
    amount: "200 G",
    protein: 27,
    carbs: 32,
    fat: 42,
    image: require("@/assets/images/food.jpg"),
  },
  {
    name: "Slice of Pineapple",
    calories: 197,
    amount: "247 G",
    protein: 84,
    carbs: 95,
    fat: 72,
    image: require("@/assets/images/food.jpg"),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  header: {
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  datePickerRow: {
    marginTop: 16,
  },
  outdatePicker: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 3,
    marginHorizontal: 4,
    borderColor: Colors.grayBackGround,
  },
  activeoutdatePicker: { borderColor: Colors.primary },
  datePicker: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.grayBackGround,
    backgroundColor: Colors.grayBackGround,
  },
  activeDate: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  OutdateTextContainer: {
    borderWidth: 1,
  },
  dateTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: "500",
  },
  dayText: {
    fontSize: 20,
    color: Colors.gray,
    fontWeight: "400",
  },
  activeDayText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  mealCategoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  mealCategoryButton: {
    borderRadius: 20,
    backgroundColor: "#f28b82",
  },
  mealCard: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  mealCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  mealImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mealDetails: {
    fontSize: 14,
    color: "#888",
  },
  mealNutrition: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  nutritionText: {
    fontSize: 14,
    color: "#555",
  },
});

export default DailyTracking;

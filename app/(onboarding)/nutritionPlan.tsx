// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import PlanChoose from "@/components/PlanChoose";
import { getNutritionPlanByDietType } from "@/services/chose";
import {
  getDietTypeByUser,
  getNutritionPlanByUser,
  getNutritionPlanValue,
} from "@/store/tokenHelper";
import { useUserData } from "@/store/userStore";

const GenderSelection = () => {
  const screenWidth = Dimensions.get("window").width;
  const NutritionPlan = getNutritionPlanValue();
  const setUserData = useUserData((state) => state.setUserData);

  const dietType = getDietTypeByUser();
  const nutritionPlan = getNutritionPlanByUser();

  const [loading, setLoading] = useState(true);
  const [nutritionPlanByDiet, setNutritionPlanByDiet] = useState([]);
  const [selectedOption, setSelectedOption] = useState(nutritionPlan || NutritionPlan[0]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const trendingResponse = await getNutritionPlanByDietType(dietType);
        setNutritionPlanByDiet(trendingResponse.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dietType]);
  useEffect(() => {
    handleSaveData();
  }, [selectedOption]);

  const handleSaveData = () => {
    setUserData({ nutritionPlan: selectedOption });
  };

  const renderGridItem = ({ item, index }) => (
    <View style={[styles.page, { width: screenWidth }]}>
      <PlanChoose
        index={index}
        imageURL={item.imageURL}
        nutritionPlanName={item.nutritionPlanName}
        proteinPercentage={item.proteinPercentage}
        fatPercentage={item.fatPercentage}
        carbsPercentage={item.carbsPercentage}
      />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  // **Xử lý khi cuộn qua phần tử mới**
  const handleScrollEnd = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollX / screenWidth);
    console.log(nutritionPlanByDiet[currentIndex].nutritionPlanName, "currentIndex");
    if (nutritionPlanByDiet[currentIndex]) {
      setSelectedOption(nutritionPlanByDiet[currentIndex].nutritionPlanName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Which plan suits you best?</Text>
      <FlatList
        data={nutritionPlanByDiet}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => `${item.nutritionPlanName}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd} // Sự kiện khi cuộn kết thúc
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    flexGrow: 1,
  },
});

export default GenderSelection;

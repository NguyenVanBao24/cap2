import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import HealthyCard from "./HealthyCard";
import { Css } from "@/constants/Css";
import HeaderElement from "./HeaderElement";

const FeaturedFoods: React.FC<FearuredFoodsProps> = ({ header, recipes }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <HeaderElement header={header} />
      <FlatList
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recipes}
        keyExtractor={(item) => item.recipe_ID}
        renderItem={({ item }) => (
          <HealthyCard
            name={item.recipeName}
            deliveryTime="15-20 mins"
            categories={[
              `${item.totalCalories} Kcal`,
              `${item.totalProtein} Protein`,
              `${item.totalCarbs} Carbs`,
              `${item.totalFat} Fats`,
            ]}
            imageUri={item.imageURL}
            id={item.recipe_ID}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Css.paddingHoriAllPage,
    flexDirection: "row",
    gap: Css.marginItemLarge,
  },
});

export default FeaturedFoods;

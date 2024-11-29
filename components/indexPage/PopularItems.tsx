import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import PopularCard from "./PopularCard";
import { Css } from "@/constants/Css";
import HeaderElement from "./HeaderElement";

const PopularItems: React.FC<FearuredFoodsProps> = ({ header, ingredient }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <HeaderElement header={header} />
      <FlatList
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ingredient}
        keyExtractor={(item) => item.ingredient_ID}
        renderItem={({ item }) => (
          <PopularCard
            numberElement={2}
            name={item.ingredientName}
            unit={item.unit}
            deliveryTime="15-20 mins"
            description={item.ingredientDescription}
            categories={[
              `${item.calories} Kcal`,
              `${item.protein} Protien`,
              `${item.carbs} Crabs`,
              `${item.fat} Fats`,
            ]}
            imageUri={item.imageURL}
            id={item.ingredient_ID}
          />
        )}
      />
    </View>
  );
};

export default PopularItems;

const styles = StyleSheet.create({
  headerItem: { paddingHorizontal: Css.paddingHoriAllPage, fontSize: 20, fontWeight: "800" },
  listContainer: { paddingHorizontal: Css.paddingHoriAllPage, gap: Css.paddingHoriAllPage },
});

import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridItems from "@/components/indexPage/GridItems";
import { calorieData, hard, meal } from "@/constants/data";
import { Colors } from "@/constants/Colors";
const gridItemsData = [
  { header: "Calorie Counters", calorieData: calorieData, line: 1 },
  { header: "Meal", calorieData: meal, line: 2 },
  { header: "Hard", calorieData: hard, line: 2 },
];
const renderGridItem = ({ item }: { item: any }) => (
  <GridItems
    header={item.header}
    calorieData={item.calorieData}
    line={item.line}
    homeBoolean={false}
  />
);
const FilterSearch = () => {
  return (
    <View>
      <Text>FilterSearch</Text>
      <FlatList
        data={gridItemsData}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => `${item.header}-${index}`}
        contentContainerStyle={styles.containerHome}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FilterSearch;

const styles = StyleSheet.create({
  containerHome: {
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
});

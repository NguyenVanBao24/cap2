import { ScrollView, StyleSheet, View } from "react-native";
import React, { memo } from "react";
import CalorieCounterItem from "./CalorieCounterItem";
import { Css } from "@/constants/Css";
import HeaderElement from "./HeaderElement";

interface GridItemsProps {
  header: string;
  calorieData: any;
  line: number;
}

const GridItems: React.FC<GridItemsProps> = memo(({ header, calorieData, line }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <HeaderElement header={header} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", paddingHorizontal: Css.paddingHoriAllPage }}>
          <CalorieCounterItem header={header} calorieData={calorieData} line={line} />
        </View>
      </ScrollView>
    </View>
  );
});

export default GridItems;

const styles = StyleSheet.create({
  headerItem: { fontSize: 20, fontWeight: "800" },
});

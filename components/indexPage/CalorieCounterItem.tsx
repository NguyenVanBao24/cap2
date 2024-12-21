import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { getRecipesByKcalService, getRecipesFilterService } from "@/services/recipeService";
import { router } from "expo-router";
import React from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 30) / 3;

interface CalorieCounterGridProps {
  calorieData: any;
  line: number;
  header: string;
  homeBoolean?: boolean;
}

const CalorieCounterGrid: React.FC<CalorieCounterGridProps> = ({
  header,
  calorieData,
  line,
  homeBoolean = true,
}) => {
  const handleItemPress = async (label: string, type: string) => {
    router.push({
      pathname: `/search/meal/${label}`,
      params: { label: label, type: type },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {line === 1 ? (
          <>
            <View style={styles.row}>
              {calorieData?.map(
                (item: any, index: number) =>
                  index % 2 === 0 && (
                    <TouchableOpacity
                      key={index}
                      style={homeBoolean ? styles.card : styles.cardBoolean}
                      onPress={() => handleItemPress(item.label, item.type)}
                    >
                      <Image
                        source={item.image}
                        style={homeBoolean ? styles.image : styles.imageBoolean}
                      />
                    </TouchableOpacity>
                  )
              )}
            </View>
            <View style={styles.row}>
              {calorieData?.map(
                (item: any, index: number) =>
                  index % 2 !== 0 && (
                    <TouchableOpacity
                      key={index}
                      style={homeBoolean ? styles.card : styles.cardBoolean}
                      onPress={() => handleItemPress(item.label, item.type)}
                    >
                      <Image
                        source={item.image}
                        style={homeBoolean ? styles.image : styles.imageBoolean}
                      />
                    </TouchableOpacity>
                  )
              )}
            </View>
          </>
        ) : (
          <View style={styles.row}>
            {calorieData?.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={homeBoolean ? styles.card : styles.cardBoolean}
                onPress={() => handleItemPress(item.label, item.type)}
              >
                <Image
                  source={item.image}
                  style={homeBoolean ? styles.image : styles.imageBoolean}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "column",
    paddingBottom: Css.marginItemSmall,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Css.marginItemSmall,
    marginBottom: Css.marginItemSmall,
  },
  card: {
    width: itemWidth, // Card width based on screen size
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 130,
    height: 130,
  },
  cardBoolean: {
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageBoolean: {
    width: 80,
    height: 80,
  },
});

export default CalorieCounterGrid;

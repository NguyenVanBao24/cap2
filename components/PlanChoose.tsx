import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Css, formatString } from "@/constants/Css";
import { colorPlan } from "@/constants/data";

const screenWidth = Dimensions.get("window").width;
const PlanChooseWidth = (screenWidth * 3.2) / 4;
const PlanChooseHeight = (PlanChooseWidth * 2) / 3;

interface PlanChooseProps {
  fullScreen?: boolean;
  nutritionPlanName: string;
  proteinPercentage: string;
  fatPercentage: string;
  carbsPercentage: string;
  imageURL: string;
  index: string;
}

const PlanChoose: React.FC<PlanChooseProps> = ({
  fullScreen = true,
  nutritionPlanName,
  proteinPercentage,
  fatPercentage,
  carbsPercentage,
  imageURL,
  index = 1,
}) => {
  return (
    <View
      style={[
        styles.container,
        fullScreen
          ? { height: PlanChooseHeight, width: PlanChooseWidth }
          : {
              width: (screenWidth * (screenWidth - Css.paddingHoriAllPage * 2)) / screenWidth,
              height: (screenWidth * 1.7) / 3,
            },
        {
          backgroundColor: colorPlan[index],
        },
      ]}
    >
      <Text style={[styles.NutritionValueText, { marginTop: 12 }]}>
        {formatString(nutritionPlanName)}
      </Text>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={styles.NutritionValue}>
          <View style={styles.NutritionValueComponent}>
            <Text style={styles.NutritionValueText}>{proteinPercentage}</Text>
            <Text style={styles.NutritionValuePercent}>%</Text>
            <Text style={styles.NutritionValueTextType}>Protein</Text>
          </View>

          <View style={styles.NutritionValueComponent}>
            <Text style={styles.NutritionValueText}>{fatPercentage}</Text>
            <Text style={styles.NutritionValuePercent}>%</Text>
            <Text style={styles.NutritionValueTextType}>Fat</Text>
          </View>
          <View style={styles.NutritionValueComponent}>
            <Text style={styles.NutritionValueText}>{carbsPercentage}</Text>
            <Text style={styles.NutritionValuePercent}>%</Text>
            <Text style={styles.NutritionValueTextType}>Crabs</Text>
          </View>
        </View>
        <View style={styles.NutritionImage}>
          <Image
            source={{ uri: imageURL }}
            style={{
              width: !fullScreen ? 220 : 200,
              height: !fullScreen ? 220 : 200,
              position: "absolute",
              bottom: -80,
              right: -20,
              borderRadius: (fullScreen ? 250 : 200) / 2,
              resizeMode: "cover",
              elevation: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PlanChoose;

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    flexDirection: "column",
    overflow: "hidden",
  },
  NutritionValue: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
  },
  NutritionValueText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
  },
  NutritionValuePercent: { fontSize: 16 },
  NutritionValueTextType: { fontSize: 20, fontWeight: "400", marginLeft: 10 },
  NutritionValueComponent: {
    flexDirection: "row",
  },
  NutritionImage: {
    flex: 2,
    overflow: "hidden",
  },
});

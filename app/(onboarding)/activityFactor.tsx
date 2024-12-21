import { Colors } from "@/constants/Colors";
import { getActivityByUser, getActivityFactor } from "@/store/tokenHelper";
import { useUserData } from "@/store/userStore";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GenderSelection = () => {
  const ActivityFactor = getActivityFactor();
  const activityFactor = getActivityByUser();

  const formatText = (text: string): string => {
    return text
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const setUserData = useUserData((state) => state.setUserData);

  const [activityFactorValue, setActivityFactorValue] = useState<string | null>(
    activityFactor || ActivityFactor[0]
  );

  React.useEffect(() => {
    handleSaveData();
  }, [activityFactorValue]);

  const handleSaveData = () => {
    setUserData({ activityFactor: activityFactorValue });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your activity level?</Text>
      <Text style={styles.description}>
        This information helps us tailor your nutritional recommendations. Your activity level
        affects your daily calorie needs and nutrient requirements, ensuring that your plan supports
        your energy expenditure and goals effectively.
      </Text>
      <View style={styles.optionsContainer}>
        {ActivityFactor?.map((option: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, activityFactorValue === option && styles.optionSelected]}
            onPress={() => setActivityFactorValue(option)}
          >
            <Text
              style={[
                styles.optionText,
                activityFactorValue === option && styles.optionTextSelected,
              ]}
            >
              {formatText(option)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#6e6e6e",
    textAlign: "center",
    marginBottom: 30,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  optionButton: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  optionSelected: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default GenderSelection;

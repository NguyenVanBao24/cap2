import { Colors } from "@/constants/Colors";
import { getDietType, getDietTypeByUser } from "@/store/tokenHelper";
import { useUserData } from "@/store/userStore";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GenderSelection = () => {
  const DietType = getDietType();
  const dietType = getDietTypeByUser();
  const formatText = (text: string): string => {
    return text
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const setUserData = useUserData((state) => state.setUserData);

  const [selectedOption, setSelectedOption] = useState<string | null>(dietType || DietType[0]);

  React.useEffect(() => {
    handleSaveData();
  }, [selectedOption]);

  const handleSaveData = () => {
    setUserData({ dietType: selectedOption });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your goal?</Text>
      <Text style={styles.description}>
        Your goal helps us create a personalized nutrition plan for you. Whether you're looking to
        gain weight, lose weight, or maintain your current weight, this information ensures your
        diet aligns with your aspirations and supports your journey effectively.
      </Text>
      <View style={styles.optionsContainer}>
        {DietType?.map((option: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedOption === option && styles.optionSelected]}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={[styles.optionText, selectedOption === option && styles.optionTextSelected]}
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

import { Colors } from "@/constants/Colors";
import { getActivityFactor } from "@/store/tokenHelper";
import { useUserData } from "@/store/userStore";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GenderSelection = () => {
  const ActivityFactor = getActivityFactor();
  const formatText = (text: string): string => {
    return text
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const setUserData = useUserData((state) => state.setUserData);

  const [selectedOption, setSelectedOption] = useState<string | null>(ActivityFactor[0]);

  React.useEffect(() => {
    handleSaveData();
  }, [selectedOption]);

  const handleSaveData = () => {
    setUserData({ activityFactor: selectedOption });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your sex?</Text>
      <Text style={styles.description}>
        This information is used to personalize your experience, for example to calculate your
        burned calories and required intake more accurately.
      </Text>
      <View style={styles.optionsContainer}>
        {ActivityFactor?.map((option: any) => (
          <TouchableOpacity
            key={option}
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

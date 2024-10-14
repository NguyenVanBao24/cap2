// CavoloNeroSalad.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface SaladProps {
  imageUrl: string;
  title: string;
  description: string;
  calories: number;
  liked: boolean;
}

const CavoloNeroSalad: React.FC<SaladProps> = ({
  imageUrl,
  title,
  description,
  calories,
  liked,
}) => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/food.jpg")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.calories}>{calories} Kcal</Text>
      </View>
      <Ionicons
        name={liked ? "heart" : "heart-outline"}
        size={24}
        color={Colors.primary}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginLeft: 10,
  },
});

export default CavoloNeroSalad;

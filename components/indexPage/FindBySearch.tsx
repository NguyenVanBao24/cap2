import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const FindBySearch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.black} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Find for nutrition..."
          placeholderTextColor="#8e8e93"
        />
      </View>
      <View style={styles.filterButton}>
        <MaterialCommunityIcons name="tune" size={24} style={styles.filterButtonIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchContainer: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundInput,
    borderRadius: 12,
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    fontSize: 14,
    padding: 10,
    backgroundColor: Colors.backgroundInput,
  },
  filterButton: {
    marginRight: 8,
    backgroundColor: Colors.backgroundInput,
    borderRadius: 12,
    padding: 17,
    shadowColor: "#000",
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  filterButtonIcon: {},
});

export default FindBySearch;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabMenu = () => {
  const [selectedTab, setSelectedTab] = useState("Breakfast");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === "Breakfast" && styles.activeTab]}
        onPress={() => setSelectedTab("Breakfast")}
      >
        <Text style={[styles.tabText, selectedTab === "Breakfast" && styles.activeTabText]}>
          Breakfast
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, selectedTab === "Lunch" && styles.activeTab]}
        onPress={() => setSelectedTab("Lunch")}
      >
        <Text style={[styles.tabText, selectedTab === "Lunch" && styles.activeTabText]}>Lunch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, selectedTab === "Dinner" && styles.activeTab]}
        onPress={() => setSelectedTab("Dinner")}
      >
        <Text style={[styles.tabText, selectedTab === "Dinner" && styles.activeTabText]}>
          Dinner
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    padding: 5,
    alignItems: "center",
    flex: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabText: {
    color: "#000",
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
  },
});

export default TabMenu;

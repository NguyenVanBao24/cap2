import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import FavoriteCard from "@/components/FavoriteCard";
import { Css } from "@/constants/Css";
import { getFavoriteUserId } from "@/services/favorite";
import { getuserID } from "@/store/tokenHelper";
import Loading from "@/components/Loading";

const Favorites = () => {
  const [activeTab, setActiveTab] = useState("Recipes");
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userID = getuserID();

  useEffect(() => {
    const favoriteApi = async () => {
      setIsLoading(true);
      try {
        const response = await getFavoriteUserId(userID);
        setResults(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userID) {
      favoriteApi();
    }
  }, [userID]);

  // Render function for FlatList
  const renderFavoriteCard = ({ item }: { item: FavoriteRecipe }) => {
    return <FavoriteCard item={item} />;
  };
  if (isLoading) {
    return <Loading backgroundColor={Colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Food" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("Food")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Food" ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Food
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Recipes" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("Recipes")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Recipes" ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Recipes
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderFavoriteCard}
          keyExtractor={(item) => item.favoriteID}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: Css.paddingHoriAllPage,
  },
  tabContainer: {
    padding: 6,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  inactiveTab: {
    backgroundColor: Colors.white,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: Colors.primary,
  },
});

export default Favorites;

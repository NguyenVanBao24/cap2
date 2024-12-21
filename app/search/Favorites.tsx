// @ts-nocheck

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import FavoriteCard from "@/components/FavoriteCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFavoriteStore } from "@/store/favorite";

const Favorites = () => {
  const renderFavoriteCard = ({ item }: { item: any }) => {
    return <FavoriteCard item={item} />;
  };

  const { allUserFavorite } = useFavoriteStore();
  return (
    <SafeAreaView>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" style={{ paddingHorizontal: 20 }} size={24} />
        </TouchableOpacity>
        <Text style={styles.iconBack}>Favorite</Text>
      </View>

      <FlatList
        data={allUserFavorite}
        renderItem={renderFavoriteCard}
        keyExtractor={(item) => item.favoriteID}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBack: { fontSize: 20 },

  inactiveTabText: {
    color: Colors.primary,
  },
});

export default Favorites;

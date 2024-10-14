import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Header from "@/components/indexPage/Header";
import FindBySearch from "@/components/indexPage/FindBySearch";
import { Colors } from "@/constants/Colors";
import FoodCategory from "@/components/indexPage/FoodCategory";
import HealthyCard from "@/components/indexPage/HealthyCard";
import PopularCard from "@/components/indexPage/PopularCard";
import NavigateDailyTracking from "@/components/indexPage/NavigateDailyTracking";

const home = () => {
  return (
    <ScrollView contentContainerStyle={styles.containerHome}>
      <Header />
      <FindBySearch />
      <NavigateDailyTracking />
      <FoodCategory />
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.headerItem}>Featured foods</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 10 }}>
            <HealthyCard
              name="McDonald's"
              rating={4.5}
              deliveryTime="10-15 mins"
              categories={["BURGER", "CHICKEN", "FAST FOOD"]}
              imageUri="https://th.bing.com/th/id/OIP.paZokRr6HFdXZQoIAKmDjgHaEK?rs=1&pid=ImgDetMain"
            />
            <HealthyCard
              name="McDonald's"
              rating={4.5}
              deliveryTime="10-15 mins"
              categories={["BURGER", "CHICKEN", "FAST FOOD"]}
              imageUri="https://th.bing.com/th/id/OIP.paZokRr6HFdXZQoIAKmDjgHaEK?rs=1&pid=ImgDetMain"
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.headerItem}>Porpular Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 14, paddingHorizontal: 10 }}>
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  containerHome: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    gap: 20,
  },
  title: { fontSize: 30, fontWeight: "800", paddingHorizontal: 10 },
  headerItem: { fontSize: 20, fontWeight: "800", paddingHorizontal: 10 },
});

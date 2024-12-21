import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import ReadMore from "react-native-read-more-text";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getIngredientService, getSearchIngredientService } from "@/services/ingredientService";
import DropDownPicker from "react-native-dropdown-picker";
import Loading from "@/components/Loading";
import { Css } from "@/constants/Css";
import FavoriteCard from "@/components/FavoriteCard";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ingredientDetail = () => {
  const [height, setHeight] = useState("100");
  const [selectedValue, setSelectedValue] = useState("");
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState<IngredientResponse | null>(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const [search, setSearch] = useState(); // Trạng thái loading

  useEffect(() => {
    const fetchingredient = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const fetchedingredient = await getIngredientService(id as string);
        const searchd = fetchedingredient.data.ingredientName;

        const searchRecipe = await getSearchIngredientService([searchd], 1);
        setIngredient(fetchedingredient); // Lưu công thức vào state
        setSearch(searchRecipe);
      } catch (err) {
        setError("Failed to fetch ingredient."); // Ghi lỗi nếu có
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchingredient(); // Gọi hàm fetch
  }, [id]);

  const handleBack = () => {
    router.back();
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Gram");
  const [items, setItems] = useState([
    { label: "Gram", value: "Gram" },
    { label: "Cup", value: "Cup" },
  ]);
  if (loading) {
    return <Loading backgroundColor={Colors.primary} />;
  }

  const renderFavoriteCard = ({ item }: { item: FavoriteRecipe }) => {
    return <FavoriteCard item={item} iconFavorite={false} />;
  };
  const renderTruncatedFooter = (handlePress: () => void) => {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.footerContainer}>
        <Text style={styles.moreText}>Xem thêm</Text>
      </TouchableOpacity>
    );
  };

  const renderRevealedFooter = (handlePress: () => void) => {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.footerContainer}>
        <Text style={styles.moreText}>Ẩn bớt</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
      <StatusBar hidden={true} />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleBack}
          style={{
            position: "absolute",
            zIndex: 1,
            width: screenWidth,
            height: 50,
            top: Css.paddingHoriIntro,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" style={{ paddingHorizontal: 20 }} size={24} />
        </TouchableOpacity>
        <View>
          <View>
            <View style={styles.header}>
              <Image source={{ uri: `${ingredient?.data.imageURL}` }} style={styles.image} />
            </View>
            <Text style={styles.title}>{ingredient?.data.ingredientName}</Text>
          </View>

          {/* Nutritional Information */}
          <View style={styles.nutrition}>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {ingredient?.data.calories}
              {"\n"}Calories
            </Text>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {ingredient?.data.carbs}
              {"\n"}Carbs (g)
            </Text>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {ingredient?.data.protein}
              {"\n"}Protein (g)
            </Text>
            <Text style={[styles.nutrient, { color: Colors.textInput }]}>
              {ingredient?.data.fat}
              {"\n"}Fat (g)
            </Text>
          </View>

          <View style={styles.containerDes}>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
            >
              <Text style={styles.des}>{ingredient?.data.ingredientDescription}</Text>
            </ReadMore>
          </View>

          <FlatList
            data={search.data}
            renderItem={renderFavoriteCard}
            keyExtractor={(item, index) => `${item.favoriteID}_${index}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={{ paddingBottom: 20 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  des: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "justify",
    padding: 10,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.36,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  nutrition: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  nutrient: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
  breakdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  ingredients: {
    backgroundColor: Colors.grayBackGround,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
    color: Colors.textInput,
  },

  showMore: {
    color: "green",
    marginTop: 5,
  },
  calorieBurn: {
    alignItems: "center",
    marginVertical: 20,
  },
  calorieText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activity: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  addButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerDes: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
  },
  dropdown: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
  },
  step: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    paddingVertical: 20,
    borderRadius: 4,
    borderBottomWidth: 1, // Thay đổi sang viền ở dưới
    borderBottomColor: "#ccc", // Màu của viền
  },
  footerContainer: {
    flexDirection: "row", // Arrange text in a row if needed
    justifyContent: "flex-end", // Align text to the right end
  },
  moreText: {
    marginTop: 5,
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default ingredientDetail;

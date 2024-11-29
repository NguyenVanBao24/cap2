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
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getIngredientService } from "@/services/ingredientService";
import DropDownPicker from "react-native-dropdown-picker";

const screenWidth = Dimensions.get("window").width;
const ingredientDetail = () => {
  const [height, setHeight] = useState("100");
  const [selectedValue, setSelectedValue] = useState("");
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState<IngredientResponse | null>(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchingredient = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const fetchedingredient = await getIngredientService(id as string); // Gọi hàm dịch vụ với ID

        setIngredient(fetchedingredient); // Lưu công thức vào state
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleBack}
          style={{
            position: "absolute",
            zIndex: 1,
            width: screenWidth,
            height: 50,
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
            <Text style={styles.des}>{ingredient?.data.ingredientDescription}</Text>
          </View>
        </View>
        <View style={styles.containerDes}>
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: "auto",
            }}
          >
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select an option"
              style={styles.dropdown} // Thêm style mới cho dropdown
              containerStyle={{ flex: 1 }} //
            />
          </View>
        </View>
        {/* <View>
          <TouchableOpacity>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 250,
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
    flexDirection: "row", //
    flexWrap: "wrap",
    gap: 8,
  },

  des: { fontSize: 14, fontWeight: "500" },
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
});

export default ingredientDetail;

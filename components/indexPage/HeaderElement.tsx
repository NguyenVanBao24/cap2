import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderElement: React.FC<FearuredFoodsProps> = ({ header, isMore = false }) => {
  const handleNavigateAll = (label: string, type: string) => {
    router.push({
      pathname: `/search/meal/${label}`,
      params: { label: label, type: type },
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        paddingHorizontal: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={styles.headerItem}>
        {header?.charAt(0)?.toUpperCase()}
        {header?.slice(1)?.toLowerCase()}
      </Text>
      {isMore && (
        <TouchableOpacity onPress={() => handleNavigateAll(label, type)}>
          <Text style={styles.seeMoreText}>MORE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderElement;

const styles = StyleSheet.create({
  headerItem: {
    color: Colors.text,
    fontSize: Css.fontTextLarge,
    fontWeight: "600",
    paddingVertical: 6,
    paddingHorizontal: Css.paddingHoriAllPage,
  },
  seeMoreText: {
    color: Colors.primary,
    fontSize: Css.fontTextLower,
    fontWeight: "600",
    marginRight: 4,
  },
});

import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { StyleSheet, Text } from "react-native";

const HeaderElement: React.FC<FearuredFoodsProps> = ({ header }) => {
  return <Text style={styles.headerItem}>{header}</Text>;
};

export default HeaderElement;

const styles = StyleSheet.create({
  headerItem: {
    color: Colors.text,
    fontSize: Css.fontTextMedium,
    fontWeight: "500",
    paddingVertical: 6,
    paddingHorizontal: Css.paddingHoriAllPage,
  },
});

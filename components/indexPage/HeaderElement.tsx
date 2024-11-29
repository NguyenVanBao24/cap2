import { Css } from "@/constants/Css";
import { StyleSheet, Text } from "react-native";

const HeaderElement: React.FC<FearuredFoodsProps> = ({ header }) => {
  return <Text style={styles.headerItem}>{header}</Text>;
};

export default HeaderElement;

const styles = StyleSheet.create({
  headerItem: {
    fontSize: Css.fontTextMedium,
    fontWeight: "500",
    paddingBottom: 6,
    paddingHorizontal: Css.paddingHoriAllPage,
  },
});

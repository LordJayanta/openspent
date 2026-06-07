import { StyleSheet } from "react-native";
import { useThemeStore } from "../theme/store/useThemeStore";

export const useGlobalStyle = () => {
  const { COLORS } = useThemeStore();
  return StyleSheet.create({
    baseScreen: {
      flex: 1,
      backgroundColor: COLORS.background.base,
    },
  });
};

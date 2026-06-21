import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { COLORS } = useThemeStore();

  return StyleSheet.create({
  });
};

import { StyleSheet } from "react-native";
import { useThemeStore } from "../theme/store/useThemeStore";

export const useGlobalStyle = () => {
  const { COLORS } = useThemeStore();
  return StyleSheet.create({
    baseScreen: {
      flex: 1,
      backgroundColor: COLORS.background.base,
    },
    primaryButton: {
      paddingVertical: 20,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 1000,
      backgroundColor: COLORS.semantic.success.bg,
      borderWidth: 1,
      borderColor: COLORS.semantic.success.border,
    },
    primaryButtonText: {
      fontSize: 16,
      color: COLORS.semantic.success.base,
      fontWeight: "600",
    },
  });
};

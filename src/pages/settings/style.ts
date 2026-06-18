import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return StyleSheet.create({
    profile: {
      paddingHorizontal: 14,
      paddingVertical: 16,
      backgroundColor: COLORS.surface.lv1,
      borderColor: COLORS.border.subtle,
      borderRadius: 14,
      borderWidth: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    info: {},
    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
  });
};

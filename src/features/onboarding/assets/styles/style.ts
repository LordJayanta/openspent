import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return StyleSheet.create({
    heroContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 32,
    },
    heroTitle: {
      width: 300,
      fontSize: 32,
      fontFamily: "Inter",
      fontWeight: "bold",
      color: COLORS.text.primary,
      textAlign: "center",
    },
    heroText: {
      width: 250,
      fontSize: 16,
      fontFamily: "Inter",
      fontWeight: "regular",
      color: COLORS.text.secondary,
      textAlign: "center",
    },
    img: {
      width: "100%",
    },
    messageContainer: {
      paddingHorizontal: 34,
    },
    message: {
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: COLORS.border.subtle,
      backgroundColor: COLORS.surface.lv1,
      borderRadius: 12,
      display: "flex",
      gap: 8,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    messageText: {
      width: 200,
      fontSize: TYPOGRAPHY.body.sm,
      fontFamily: "Inter",
      fontWeight: "regular",
      color: COLORS.text.secondary,
    },
  });
};

import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { COLORS, TYPOGRAPHY } = useThemeStore();

  return StyleSheet.create({
    amountContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      paddingVertical: 12,
    },
    text: {
      color: COLORS.text.secondary,
      fontSize: TYPOGRAPHY.body.caption,
    },
    amountSymbol: {
      color: COLORS.text.accent,
      fontSize: TYPOGRAPHY.heading.h2,
    },
    amountInput: {
      color: COLORS.text.primary,
      fontSize: TYPOGRAPHY.display.xl,
    },

    // Category Card
    categoryContainer: {
      position: "relative",
    },
    categoryContainerScroll: {
      display: "flex",
      flexDirection: "row",
      gap: 16,
      flexWrap: "nowrap",
      paddingLeft: 16,
      paddingRight: 42,
    },

    createButtonContainer: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: COLORS.border.subtle,
    },

    noteContainer: {
      height: 69,
      paddingHorizontal: 12,
      paddingVertical: 12,
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      overflow: "hidden",
    },
  });
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import themes from "../../theme/constants";

type ThemeName = keyof typeof themes;

interface ThemeState {
  theme: ThemeName;
  COLORS: (typeof themes)[ThemeName]["COLORS"];
  TYPOGRAPHY: (typeof themes)[ThemeName]["TYPOGRAPHY"];
  allThemes: ThemeName[];

  setTheme: (theme: ThemeName) => void;
}

const defaultTheme = Object.keys(themes)[0] as ThemeName;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      COLORS: themes[defaultTheme].COLORS,
      TYPOGRAPHY: themes[defaultTheme].TYPOGRAPHY,
      allThemes: Object.keys(themes) as ThemeName[],

      setTheme: (theme: ThemeName) => {
        if (!themes[theme]) return;
        set({
          theme: theme,
          COLORS: themes[theme].COLORS,
          TYPOGRAPHY: themes[theme].TYPOGRAPHY,
        });
      },
    }),
    {
      name: "openspent-theme-storage", // Unique key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

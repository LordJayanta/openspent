import SafeScreen from "@/shared/components/ui/safe-screen";
import { useThemeStore } from "@/shared/theme/store/useThemeStore";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const { theme } = useThemeStore();
  return (
    <SafeAreaProvider>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <SafeScreen>
        <Slot />
        {/* <Stack />  */}
        {/* NOTE: Dont use it in this suctucion it will not work properly, use : SafeAreaProvider > SafeAreaView > Slot*/}
      </SafeScreen>
    </SafeAreaProvider>
  );
}

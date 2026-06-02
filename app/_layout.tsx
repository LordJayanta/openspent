import SafeScreen from "@/src/shared/components/ui/safe-screen";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeScreen>
        <Slot />
        {/* <Stack />  */}
        {/* NOTE: Dont use it in this suctucion it will not work properly, use : SafeAreaProvider > SafeAreaView > Slot*/}
      </SafeScreen>
    </SafeAreaProvider>
  );
}

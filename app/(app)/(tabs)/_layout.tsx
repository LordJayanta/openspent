import { COLORS } from "@/src/shared/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function TabLayout() {
    const {bottom} = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.text,
                tabBarStyle: { backgroundColor: COLORS.surface },
                headerTintColor: COLORS.primary,
            }}
            safeAreaInsets={{bottom: bottom+12}}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name={focused ? "home" : "home-outline"} color={color} size={24} />)
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name={focused ? "analytics" : "analytics-outline"} color={color} size={24} />)
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />)
                }}
            />
        </Tabs>
    )
}
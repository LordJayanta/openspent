import AddButton from "@/app/(app)/(tabs)/add-button";
import { useThemeStore } from "@/shared/theme/store/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function TabLayout() {
    const { bottom } = useSafeAreaInsets();
    const { COLORS } = useThemeStore();

    // THE SENIOR TRICK: 
    // If bottom is > 24, it's 3-button navigation. If not, it's gestures.
    const isThreeButtonNav = bottom > 24;

    // Apply your specific math based on the detection
    const extraPadding = isThreeButtonNav ? 28 : 65;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.text.accent,  // active bar icon color
                tabBarInactiveTintColor: COLORS.text.disabled,  // disabled bar icon color
                tabBarStyle: {
                    height: extraPadding + bottom,
                    backgroundColor: COLORS.background.base,  // background color
                    borderTopColor: COLORS.border.subtle,  // border color
                    paddingTop: 12,
                },
            }}
            safeAreaInsets={{ bottom: bottom + 12 }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name={focused ? "home" : "home-outline"} color={color} size={24} />)
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name={focused ? "list" : "list-outline"} color={color} size={24} />)
                }}
            />
            <Tabs.Screen
                name="add-button"
                options={{
                    tabBarIcon: ({ focused, color }) => (<Ionicons name={focused ? "add" : "add-circle"} color={color} size={40} />),
                    tabBarButton: () => AddButton(),
                    tabBarItemStyle: {
                        alignItems: 'center',
                        // position: 'relative',
                        // top: -30
                    },
                    tabBarLabelStyle: { display: 'none' },
                }}
                listeners={{
                    tabPress: (e) => {
                        // NOTE: May be not working properly, but handal it on AddButton()
                        e.preventDefault();
                        router.push("/(app)/transaction/create");
                    }
                }}

            />
            <Tabs.Screen
                name="insights"
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
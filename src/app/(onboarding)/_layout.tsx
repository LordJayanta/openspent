import { useUserStore } from "@/features/user/store/useUserStore";
import PageLoader from "@/shared/components/page-loader";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
    const { isLoading} = useUserStore();

    if (isLoading) return <PageLoader />;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" />
        </Stack>
    )
}
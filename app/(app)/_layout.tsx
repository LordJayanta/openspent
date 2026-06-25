import LockScreen from "@/src/features/biometric-auth/components/lockScreen";
import { useLocalAuthStore } from "@/src/features/biometric-auth/store/useLocalAuthStore";
import { useSettingStore } from "@/src/features/settings/store/useSettingStore";
import { useTransactionStore } from "@/src/features/transactions/store/useTransactionStore";
import { useUserStore } from "@/src/features/user/store/useUserStore";
import PageLoader from "@/src/shared/components/page-loader";
import { useThemeStore } from "@/src/shared/theme/store/useThemeStore";
import { Redirect, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function AppLayout() {
    const appState = useRef(AppState.currentState);

    const { isLoading, loadDatabase } = useTransactionStore();
    const { hasFinishedOnboarding, loadUser } = useUserStore()

    const { isUnlocked, toggleUnlock, lock } = useLocalAuthStore();
    const { isEnableBiometricAuth, loadSettings } = useSettingStore();

    // Use a state to check if the store has finished "hydrating" (loading from storage)
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Zustand persist has a way to check hydration
        const rehydrate = async () => {
            await useThemeStore.persist.rehydrate();
            setIsReady(true);
        };
        rehydrate();
    }, []);



    useEffect(() => {
        loadUser();
        loadDatabase();
        loadSettings();
        if (isEnableBiometricAuth) toggleUnlock();
    }, [loadDatabase, loadUser, loadSettings, toggleUnlock, isEnableBiometricAuth]);

    useEffect(() => {
        // Listen for App State changes
        const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
            // If the app is going into the background or being closed
            if (nextAppState.match(/(inactive|background)/)) {

                if (isEnableBiometricAuth) lock(); // Set isUnlocked to false
            }
            appState.current = nextAppState;
        })

        return () => {
            subscription.remove();
        }

    }, [isEnableBiometricAuth, lock]);


    if (isLoading) return <PageLoader />;
    if (!isUnlocked && isEnableBiometricAuth) return <LockScreen />;
    if (!hasFinishedOnboarding) return <Redirect href={'/(onboarding)/onboarding'} />;
    if (!isReady) return <PageLoader />;

    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="transaction/create" />
        </Stack>
    )
}
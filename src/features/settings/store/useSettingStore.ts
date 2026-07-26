import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";
import { checkBiometricAuth } from "../../biometric-auth/utils";

type Settings = {
  isEnableBiometricAuth: boolean;
};

type Store = {
  isEnableBiometricAuth: boolean;

  loadSettings: () => void;
  enableBiometricAuth: () => void;
  disableBiometricAuth: () => void;
};

export const useSettingStore = create<Store>((set) => ({
  isEnableBiometricAuth: false,

  loadSettings: async () => {
    const settings = await AsyncStorage.getItem("sw_settings");

    if (settings) {
      const parsedSettings = JSON.parse(settings) as Settings;
      set({ isEnableBiometricAuth: parsedSettings.isEnableBiometricAuth });
    }
  },
  enableBiometricAuth: async () => {
    const result = await checkBiometricAuth();

    if (result?.error) {
      Alert.alert("Error", result?.error);
      return;
    }

    if (result?.success) {
      const settings: Settings = {
        isEnableBiometricAuth: true,
      };
      await AsyncStorage.setItem("sw_settings", JSON.stringify(settings));
      set({ isEnableBiometricAuth: true });
      Alert.alert("Success", "Biometric authentication enabled.");
    }
  },
  disableBiometricAuth: async () => {
    const result = await checkBiometricAuth();

    if (result?.error) {
      Alert.alert("Error", result?.message);
      return;
    }

    if (result?.success) {
      const settings: Settings = {
        isEnableBiometricAuth: false,
      };
      await AsyncStorage.setItem("sw_settings", JSON.stringify(settings));
      set({ isEnableBiometricAuth: false });
      Alert.alert("Success", "Biometric authentication disabled.");
    }
  },
}));

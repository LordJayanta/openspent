import * as LocalAuthentication from "expo-local-authentication";

export type BiometricAuthResult = {
  success: boolean;
  message?: string;
  error?: string;
};

export const checkBiometricAuth = async (): Promise<BiometricAuthResult> => {
  try {
    // Check if the device supports biometric authentication
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return {
        success: false,
        message: "Biometric authentication is not supported on this device.",
      };
    }

    // Check if the user has enrolled biometrics (Face ID / Fingerprint / Passcode)
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return {
        success: false,
        message:
          "No biometrics enrolled. Please set up Face ID or Fingerprint in your settings.",
      };
    }

    // Prompt for authentication
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to Unlock openspent",
      cancelLabel: "Cancel",
      fallbackLabel: "Use Password",
      disableDeviceFallback: false,
    });

    if (result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: result.error,
        message: "Authentication failed or was cancelled.",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      error: error?.message as string,
      message: "An unexpected error occurred during biometric authentication.",
    };
  }
};

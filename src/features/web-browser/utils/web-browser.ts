import { ExternalPathString } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";

export const OpenWebBrowser = async (url: ExternalPathString) => {
  try {
    await WebBrowser.openBrowserAsync(url, {
      enableBarCollapsing: true,
    });
  } catch (error) {
    Alert.alert("Error", "Failed to open web browser");
    console.error("Error opening web browser: ", error);
  }
};

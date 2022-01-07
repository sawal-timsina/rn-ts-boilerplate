import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./lib/i18n";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./lib/auth/AuthContext";
import { Screens } from "./screens";
import FlashMessage from "react-native-flash-message";
import { enableScreens } from "react-native-screens";

enableScreens(true);

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <Screens />
              <FlashMessage position="bottom" />
            </I18nextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;

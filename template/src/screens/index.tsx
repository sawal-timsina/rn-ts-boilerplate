import React, { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../lib/auth/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

export const Screens = () => {
  const { loggedIn } = useContext(AuthContext);

  // [1] remove if Onboarding is not required
  const [routeName, setRouteName] = useState<"Onboarding" | "Home" | null>(
    null
  );

  useEffect(() => {
    AsyncStorage.getItem("showOnboarding").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("showOnboarding", "true");
        setRouteName("Onboarding");
      } else {
        setRouteName("Home");
      }
    });
  }, []);

  if (routeName === null) {
    return <></>;
  }
  // [1]

  return (
    <SafeAreaView
      style={styles.container}
      edges={
        Platform.OS === "ios" && routeName === "Onboarding" ? ["left"] : ["top"]
      }
    >
      <Stack.Navigator
        detachInactiveScreens={true}
        initialRouteName={routeName}
      >
        {/*// [1] remove if Onboarding is not required*/}
        {routeName !== "Home" && (
          <Stack.Screen name={"Onboarding"}>
            {/*// use your onboarding page here*/}
            {() => <View />}
          </Stack.Screen>
        )}
        {/*// [1]*/}

        <Stack.Screen name={"Home"} component={View} />

        {loggedIn ? (
          <Stack.Screen name={"Profile"} component={View} />
        ) : (
          <Stack.Screen name={"Login"} component={View} />
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

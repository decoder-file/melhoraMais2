import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";
import { Registration } from "../screens/Registration";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator initialRouteName="Login">
      <Screen name="Login" component={SignIn} options={{ headerShown: false }} />
      <Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}

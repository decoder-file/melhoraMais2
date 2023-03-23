import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator initialRouteName="Login">
      <Screen name="login" component={SignIn} options={{ headerShown: false }} />
      <Screen
        name="signUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}

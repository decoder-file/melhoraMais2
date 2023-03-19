import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CreateTag } from "../screens/CreateTag";
import { Dashboard } from "../screens/Dashboard";
import { RegisterCalculation } from "../screens/RegisterCalculation";
import { Profile } from "../screens/Profile";
import { RegisterCalculationEdit, RegisterCalculationEditProps} from "../screens/RegisterCalculationEdit";


export type RootStackParamList = {
  CreateTag: undefined;
  Dashboard: undefined;
  RegisterCalculation: undefined;
  RegisterCalculationEdit: RegisterCalculationEditProps;
  Profile: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="Dashboard">
      <Screen
        name="CreateTag"
        component={CreateTag}
        options={{ headerShown: false }}
      />
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Screen
        name="RegisterCalculation"
        component={RegisterCalculation}
        options={{ headerShown: false }}
      />
       <Screen
        name="RegisterCalculationEdit"
        component={RegisterCalculationEdit}
        options={{ headerShown: false }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}

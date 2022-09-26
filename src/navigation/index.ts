import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/homescreen";

export type RootStackParams = {
  HomeScreen: {
    reference: any;
  };
  MovieScreen: {
    id: string;
  };
};
export const RootStack = createNativeStackNavigator<RootStackParams>();

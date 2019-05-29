import React, { Component } from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./app/screens/Login/LoginScreen";

import DrawerNavigator from "./app/config/routing/DrawerNavigator";

//Remove yellow warnings
console.disableYellowBox = true;

const AppNavigator = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    DrawerNavigator: {
      screen: DrawerNavigator
    }
  },
  {
    initialRouteName: "DrawerNavigator"
  }
);

export default createAppContainer(AppNavigator);

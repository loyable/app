import React, { Component } from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./app/screens/Login/LoginScreen";
import VerifyLoginScreen from "./app/screens/Login/VerifyLoginScreen";

import DrawerNavigator from "./app/config/routing/DrawerNavigator";

const AppNavigator = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    VerifyLogin: {
      screen: VerifyLoginScreen
    },
    DrawerNavigator: {
      screen: DrawerNavigator
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);

import React, { Component } from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./app/screens/Login/LoginScreen";
import VerifyLoginScreen from "./app/screens/Login/VerifyLoginScreen";

import DrawerNavigator from "./app/config/routing/DrawerNavigator";

//Remove yellow warnings
console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

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
    initialRouteName: "DrawerNavigator"
  }
);

export default createAppContainer(AppNavigator);

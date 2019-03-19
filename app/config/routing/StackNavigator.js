import React from "react";

import { createStackNavigator } from "react-navigation";

//Import TabNavigator
import TabNavigator from "./TabNavigator";

//Import Icons
import LogoIcon from "../../components/icons/LogoIcon";
import HamburgerIcon from "../../components/icons/HamburgerIcon";
import QRCodeIcon from "../../components/icons/QRCodeIcon";
import BackIcon from "../../components/icons/BackIcon";

import QRCodeScreen from "../../screens/QRCodeScreen";
import SettingsScreen from "../../screens/SettingsScreen";

import Header from "../../components/ui/Header";

//Global Vars
import vars from "../styles";

export default createStackNavigator(
  {
    AppTab: {
      screen: TabNavigator
    },
    QRCode: {
      screen: QRCodeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header backArrow={true} navigation={navigation} />
        };
      }
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    headerTransitionPreset: "uikit",
    headerLayoutPreset: "center",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: <Header navigation={navigation} />
      };
    }
  }
);

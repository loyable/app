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
          headerLeft: <BackIcon navigation={navigation} />
        };
      }
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    headerMode: "float",
    headerTransitionPreset: "uikit",
    headerLayoutPreset: "center",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: vars.headerStyle,
        headerTitle: <LogoIcon navigation={navigation} link="Cards" />,
        headerLeft: <HamburgerIcon navigation={navigation} />,
        headerRight: <QRCodeIcon navigation={navigation} />
      };
    }
  }
);

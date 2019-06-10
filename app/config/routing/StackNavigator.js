import React from "react";

import { createStackNavigator } from "react-navigation";

//Import TabNavigator
import TabNavigator from "./TabNavigator";

import QRCodeScreen from "../../screens/QRCodeScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import AccountScreen from "../../screens/AccountScreen";
import ChangeNumberScreen from "../../screens/ChangeNumberScreen";
import InstructionsScreen from "../../screens/InstructionsScreen";
import ContactScreen from "../../screens/ContactScreen";

import Header from "../../components/ui/Header";

export default createStackNavigator(
  {
    AppTab: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header navigation={navigation} showBottomShadow={true} />
        };
      }
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
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: (
            <Header
              backArrow={true}
              navigation={navigation}
              showBottomShadow={true}
            />
          )
        };
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: (
            <Header
              backArrow={true}
              navigation={navigation}
              showBottomShadow={true}
            />
          )
        };
      }
    },
    ChangeNumber: {
      screen: ChangeNumberScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: (
            <Header
              backArrow={true}
              navigation={navigation}
              showBottomShadow={true}
            />
          )
        };
      }
    },
    Instructions: {
      screen: InstructionsScreen,
      navigationOptions: () => {
        return {
          header: null
        };
      }
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: (
            <Header
              backArrow={true}
              navigation={navigation}
              showBottomShadow={true}
            />
          )
        };
      }
    }
  },
  {
    headerTransitionPreset: "uikit",
    headerLayoutPreset: "center",
    headerMode: "screen",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: <Header navigation={navigation} showBottomShadow={true} />
      };
    }
  }
);

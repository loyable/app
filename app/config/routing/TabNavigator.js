import React from "react";

import { Platform } from "react-native";

import { createBottomTabNavigator } from "react-navigation";

//Import screens
import CardsScreen from "../../screens/Cards/CardsScreen";
import MapScreen from "../../screens/Map/MapScreen";

//Icons
import Icon from "../../components/icons/Icon";

//Global Vars
import vars from "../styles";

export default createBottomTabNavigator(
  {
    Cards: {
      screen: CardsScreen,
      navigationOptions: {
        tabBarLabel: "Carte",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="credit-card" color={tintColor} />
        )
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: "Mappa",
        tabBarIcon: ({ tintColor }) => <Icon name="map" color={tintColor} />
      }
    }
  },
  {
    initialRouteName: "Cards",
    tabBarOptions: {
      activeTintColor: vars.color.activeTab,
      inactiveTintColor: vars.color.inactiveTab,
      labelStyle: {
        fontSize: Platform.OS === "android" ? 16 : 15,
        fontFamily: vars.font.bold,
        paddingBottom: Platform.OS === "android" ? 5 : 0
      },
      style: {
        height: Platform.OS === "android" ? 65 : 55
      }
    }
  }
);

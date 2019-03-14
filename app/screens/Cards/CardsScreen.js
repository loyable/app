import React, { Component } from "react";

import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import CardsListScreen from "./CardsListScreen";
import CardsGridScreen from "./CardsGridScreen";
import DetailsScreen from "./DetailsScreen";
import CardDetailsScreen from "./CardDetailsScreen";

import Header from "../../components/ui/Header";

const CardDetailsStack = createStackNavigator(
  {
    CardsList: {
      screen: CardsListScreen
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header backArrow={true} navigation={navigation} />
        };
      }
    },
    CardDetails: {
      screen: CardDetailsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header backArrow={true} navigation={navigation} />
        };
      }
    }
  },
  {
    initialRouteName: "CardsList",
    headerMode: "none",
    headerTransitionPreset: "uikit",
    headerLayoutPreset: "center",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: <Header navigation={navigation} />
      };
    }
  }
);

export default createSwitchNavigator(
  {
    CardsList: {
      screen: CardDetailsStack
    },
    CardsGrid: {
      screen: CardsGridScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "CardsList"
  }
);

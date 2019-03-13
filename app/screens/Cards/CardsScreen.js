import React, { Component } from "react";

import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import CardsListScreen from "./CardsListScreen";
import CardsGridScreen from "./CardsGridScreen";
import DetailsScreen from "./DetailsScreen";
import CardDetailsScreen from "./CardDetailsScreen";

import BackIcon from "../../components/icons/BackIcon";

const CardDetailsStack = createStackNavigator(
  {
    CardsList: {
      screen: CardsListScreen
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: <BackIcon navigation={navigation} />
        };
      }
    },
    CardDetails: {
      screen: CardDetailsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: <BackIcon navigation={navigation} />
        };
      }
    }
  },
  {
    headerMode: "none",
    initialRouteName: "CardsList"
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

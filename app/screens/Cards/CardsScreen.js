import React, { Component } from "react";

import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import CardsListScreen from "./CardsListScreen";
import CardsGridScreen from "./CardsGridScreen";
import DetailsScreen from "./DetailsScreen";
import CardDetailsScreen from "./CardDetailsScreen";

const CardDetailsStack = createStackNavigator(
  {
    CardsList: {
      screen: CardsListScreen
    },
    Details: {
      screen: DetailsScreen
    },
    CardDetails: {
      screen: CardDetailsScreen
    }
  },
  {
    initialRouteName: "CardsList",
    headerMode: "none"
  }
);

const CardGridDetailsStack = createStackNavigator(
  {
    CardsGrid: {
      screen: CardsGridScreen
    },
    DetailsGrid: {
      screen: DetailsScreen
    },
    CardGridDetails: {
      screen: CardDetailsScreen
    }
  },
  {
    initialRouteName: "CardsGrid",
    headerMode: "none"
  }
);

export default createSwitchNavigator(
  {
    CardsList: {
      screen: CardDetailsStack
    },
    CardsGrid: {
      screen: CardGridDetailsStack
    }
  },
  {
    headerMode: "none",
    initialRouteName: "CardsList"
  }
);

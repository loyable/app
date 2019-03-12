import React, { Component } from "react";

import { createSwitchNavigator } from "react-navigation";

import CardsListScreen from "./CardsListScreen";
import CardsGridScreen from "./CardsGridScreen";

export default createSwitchNavigator(
  {
    CardsList: {
      screen: CardsListScreen
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

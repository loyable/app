import React, { Component } from "react";

import { createSwitchNavigator } from "react-navigation";

import MapListScreen from "./MapListScreen";
import MapViewScreen from "./MapViewScreen";

export default createSwitchNavigator(
  {
    MapView: {
      screen: MapViewScreen
    },
    MapList: {
      screen: MapListScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "MapView"
  }
);
